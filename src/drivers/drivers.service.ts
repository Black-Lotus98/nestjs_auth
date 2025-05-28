import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverFilterDto } from './dto/driver-filter.dto';
import { DriverResponseDto } from './dto/driver-response.dto';
import { plainToInstance } from 'class-transformer';
import { EmploymentsService } from 'src/employments/employments.service';
import { CreateEmploymentDto } from 'src/employments/dto/create-employment.dto';
import { EmploymentResponseDto } from 'src/employments/dto/employment-response.dto';
@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    private employmentsService: EmploymentsService,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const driver = this.driverRepository.create(createDriverDto);
    const savedDriver = await this.driverRepository.save(driver);

    if (createDriverDto.employments?.length) {
      const employments = createDriverDto.employments.map((employment) => ({
        ...employment,
        driverId: savedDriver.id,
      }));
      await this.employmentsService.create(
        employments as unknown as CreateEmploymentDto,
      );
    }

    return savedDriver;
  }

  async findAll(filter: DriverFilterDto): Promise<{
    data: DriverResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page, limit, sort, sortBy, ...filterData } = filter;
    // const drivers1 = await this.driverRepository.find({
    //   relations: ['employments'],
    // });
    const query = this.driverRepository.createQueryBuilder('driver');
    query.leftJoinAndSelect('driver.employments', 'employments');

    if (sort && sortBy) {
      query.orderBy(`driver.${sortBy}`, sort);
    }

    Object.keys(filterData).forEach((key) => {
      if (filterData[key]) {
        query.andWhere(`driver.${key} LIKE :${key}`, {
          [key]: `%${filterData[key]}%`,
        });
      }
    });

    if (page && limit) {
      query.skip((page - 1) * limit);
      query.take(limit);
    }

    const [drivers, total] = await query.getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return {
      data: drivers.map((driver) =>
        plainToInstance(
          DriverResponseDto,
          {
            ...driver,
            employments: (driver.employments ?? []).map((employment) =>
              plainToInstance(EmploymentResponseDto, {
                ...employment,
                driver: undefined,
              }),
            ),
          },
          { excludeExtraneousValues: true },
        ),
      ),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string) {
    const driver = await this.driverRepository.findOne({
      where: { id },
      relations: ['employments'],
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return plainToInstance(
      DriverResponseDto,
      {
        ...driver,
        employments: (driver?.employments ?? []).map((employment) =>
          plainToInstance(EmploymentResponseDto, {
            ...employment,
            driver: undefined,
          }),
        ),
      },
      { excludeExtraneousValues: true },
    );
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepository.findOne({
      where: { id },
      relations: ['employments'],
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    if (updateDriverDto.employments?.length) {
      const employments = updateDriverDto.employments.map((employment) => ({
        ...employment,
        driverId: driver?.id,
      }));
      await this.employmentsService.create(
        employments as unknown as CreateEmploymentDto,
      );
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const driver = await this.driverRepository.findOne({
      where: { id },
      relations: ['employments'],
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return await this.driverRepository.softDelete(id);
  }

  async findByNationalId(nationalId: string) {
    const driver = await this.driverRepository.findOne({
      where: { nationalId },
      select: {
        id: true,
        nationalId: true,
      },
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return plainToInstance(
      DriverResponseDto,
      {
        ...driver,
        employments: (driver?.employments ?? []).map((employment) =>
          plainToInstance(EmploymentResponseDto, {
            ...employment,
            driver: undefined,
          }),
        ),
      },
      { excludeExtraneousValues: true },
    );
  }
}

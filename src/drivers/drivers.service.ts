import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverFilterDto } from './dto/driver-filter.dto';
import { DriverResponseDto } from './dto/driver-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const driver = this.driverRepository.create(createDriverDto);
    const savedDriver = await this.driverRepository.save(driver);
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
    const skip = (page - 1) * limit;
    const take = limit;
    const query = this.driverRepository
      .createQueryBuilder('driver')
      .leftJoinAndSelect('driver.user', 'user');

    Object.keys(filterData).forEach((key) => {
      if (filterData[key]) {
        query.andWhere(`driver.${key} LIKE :${key}`, {
          [key]: `%${filterData[key]}%`,
        });
      }
    });

    const [drivers, total] = await query
      .skip(skip)
      .take(take)
      .orderBy(`driver.${sortBy}`, sort)
      .getManyAndCount();

    if (drivers.length === 0) {
      throw new NotFoundException('No drivers found');
    }

    const totalPages = Math.ceil(total / limit);
    return {
      data: drivers.map((driver) =>
        plainToInstance(DriverResponseDto, driver, {
          excludeExtraneousValues: true,
        }),
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
      relations: ['user'],
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return plainToInstance(DriverResponseDto, driver, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    Object.assign(driver, updateDriverDto);
    const updatedDriver = await this.driverRepository.save(driver);

    return plainToInstance(DriverResponseDto, updatedDriver, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    const driver = await this.driverRepository.findOne({
      where: { id },
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return await this.driverRepository.softDelete(id);
  }
}

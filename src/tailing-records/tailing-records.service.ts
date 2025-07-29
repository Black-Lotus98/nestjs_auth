import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTailingRecordDto } from './dto/create-tailing-record.dto';
import { UpdateTailingRecordDto } from './dto/update-tailing-record.dto';
import { TailingRecord } from './entities/tailing-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TailingRecordResponseDto } from './dto/tailing-record-response.dto';
import { plainToInstance } from 'class-transformer';
import { Driver } from 'src/drivers/entities/driver.entity';

@Injectable()
export class TailingRecordsService {
  constructor(
    @InjectRepository(TailingRecord)
    private tailingRecordRepository: Repository<TailingRecord>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async create(createTailingRecordDto: CreateTailingRecordDto) {
    // Check if driver exists
    const driver = await this.driverRepository.findOne({
      where: { id: createTailingRecordDto.driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Driver with ID ${createTailingRecordDto.driverId} not found`,
      );
    }

    const tailingRecord = this.tailingRecordRepository.create(
      createTailingRecordDto,
    );
    const savedTailingRecord =
      await this.tailingRecordRepository.save(tailingRecord);

    return plainToInstance(TailingRecordResponseDto, savedTailingRecord, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const tailingRecords = await this.tailingRecordRepository.find({
      relations: ['driver'],
    });

    return tailingRecords.map((tailingRecord) =>
      plainToInstance(TailingRecordResponseDto, tailingRecord, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findOne(id: string) {
    const tailingRecord = await this.tailingRecordRepository.findOne({
      where: { id },
      relations: ['driver'],
    });

    if (!tailingRecord) {
      throw new NotFoundException('Tailing record not found');
    }

    return plainToInstance(TailingRecordResponseDto, tailingRecord, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateTailingRecordDto: UpdateTailingRecordDto) {
    const tailingRecord = await this.tailingRecordRepository.findOne({
      where: { id },
    });

    if (!tailingRecord) {
      throw new NotFoundException('Tailing record not found');
    }

    // Check if driver exists if driverId is being updated
    if (updateTailingRecordDto.driverId) {
      const driver = await this.driverRepository.findOne({
        where: { id: updateTailingRecordDto.driverId },
      });

      if (!driver) {
        throw new NotFoundException(
          `Driver with ID ${updateTailingRecordDto.driverId} not found`,
        );
      }
    }

    Object.assign(tailingRecord, updateTailingRecordDto);
    const updatedTailingRecord =
      await this.tailingRecordRepository.save(tailingRecord);

    return plainToInstance(TailingRecordResponseDto, updatedTailingRecord, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    const tailingRecord = await this.tailingRecordRepository.findOne({
      where: { id },
    });

    if (!tailingRecord) {
      throw new NotFoundException('Tailing record not found');
    }

    return await this.tailingRecordRepository.softDelete(id);
  }
}

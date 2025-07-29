import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTailingGradeDto } from './dto/create-tailing-grade.dto';
import { UpdateTailingGradeDto } from './dto/update-tailing-grade.dto';
import { TailingGrade } from './entities/tailing-grade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TailingGradeResponseDto } from './dto/tailing-grade-response.dto';
import { plainToInstance } from 'class-transformer';
import { TailingRecord } from 'src/tailing-records/entities/tailing-record.entity';
import { InspectionDetail } from 'src/inspection-details/entities/inspection-detail.entity';

@Injectable()
export class TailingGradesService {
  constructor(
    @InjectRepository(TailingGrade)
    private tailingGradeRepository: Repository<TailingGrade>,
    @InjectRepository(TailingRecord)
    private tailingRecordRepository: Repository<TailingRecord>,
    @InjectRepository(InspectionDetail)
    private inspectionDetailRepository: Repository<InspectionDetail>,
  ) {}

  async create(createTailingGradeDto: CreateTailingGradeDto) {
    // Check if tailing record exists
    const tailingRecord = await this.tailingRecordRepository.findOne({
      where: { id: createTailingGradeDto.recordId },
    });

    if (!tailingRecord) {
      throw new NotFoundException(
        `Tailing record with ID ${createTailingGradeDto.recordId} not found`,
      );
    }

    // Check if inspection detail exists
    const inspectionDetail = await this.inspectionDetailRepository.findOne({
      where: { id: createTailingGradeDto.itemId },
    });

    if (!inspectionDetail) {
      throw new NotFoundException(
        `Inspection detail with ID ${createTailingGradeDto.itemId} not found`,
      );
    }

    const tailingGrade = this.tailingGradeRepository.create(
      createTailingGradeDto,
    );
    const savedTailingGrade =
      await this.tailingGradeRepository.save(tailingGrade);

    return plainToInstance(TailingGradeResponseDto, savedTailingGrade, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const tailingGrades = await this.tailingGradeRepository.find({
      relations: ['tailingRecord', 'inspectionDetail'],
    });

    return tailingGrades.map((tailingGrade) =>
      plainToInstance(TailingGradeResponseDto, tailingGrade, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findOne(id: string) {
    const tailingGrade = await this.tailingGradeRepository.findOne({
      where: { id },
      relations: ['tailingRecord', 'inspectionDetail'],
    });

    if (!tailingGrade) {
      throw new NotFoundException('Tailing grade not found');
    }

    return plainToInstance(TailingGradeResponseDto, tailingGrade, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateTailingGradeDto: UpdateTailingGradeDto) {
    const tailingGrade = await this.tailingGradeRepository.findOne({
      where: { id },
    });

    if (!tailingGrade) {
      throw new NotFoundException('Tailing grade not found');
    }

    // Check if tailing record exists if recordId is being updated
    if (updateTailingGradeDto.recordId) {
      const tailingRecord = await this.tailingRecordRepository.findOne({
        where: { id: updateTailingGradeDto.recordId },
      });

      if (!tailingRecord) {
        throw new NotFoundException(
          `Tailing record with ID ${updateTailingGradeDto.recordId} not found`,
        );
      }
    }

    // Check if inspection detail exists if itemId is being updated
    if (updateTailingGradeDto.itemId) {
      const inspectionDetail = await this.inspectionDetailRepository.findOne({
        where: { id: updateTailingGradeDto.itemId },
      });

      if (!inspectionDetail) {
        throw new NotFoundException(
          `Inspection detail with ID ${updateTailingGradeDto.itemId} not found`,
        );
      }
    }

    Object.assign(tailingGrade, updateTailingGradeDto);
    const updatedTailingGrade =
      await this.tailingGradeRepository.save(tailingGrade);

    return plainToInstance(TailingGradeResponseDto, updatedTailingGrade, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    const tailingGrade = await this.tailingGradeRepository.findOne({
      where: { id },
    });

    if (!tailingGrade) {
      throw new NotFoundException('Tailing grade not found');
    }

    return await this.tailingGradeRepository.softDelete(id);
  }
}

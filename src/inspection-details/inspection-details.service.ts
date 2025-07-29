import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInspectionDetailDto } from './dto/create-inspection-detail.dto';
import { UpdateInspectionDetailDto } from './dto/update-inspection-detail.dto';
import { InspectionDetail } from './entities/inspection-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InspectionDetailResponseDto } from './dto/inspection-detail-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InspectionDetailsService {
  constructor(
    @InjectRepository(InspectionDetail)
    private inspectionDetailRepository: Repository<InspectionDetail>,
  ) {}

  async create(createInspectionDetailDto: CreateInspectionDetailDto) {
    const inspectionDetail = this.inspectionDetailRepository.create(
      createInspectionDetailDto,
    );
    const savedInspectionDetail =
      await this.inspectionDetailRepository.save(inspectionDetail);

    return plainToInstance(InspectionDetailResponseDto, savedInspectionDetail, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const inspectionDetails = await this.inspectionDetailRepository.find();

    return inspectionDetails.map((inspectionDetail) =>
      plainToInstance(InspectionDetailResponseDto, inspectionDetail, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findOne(id: string) {
    const inspectionDetail = await this.inspectionDetailRepository.findOne({
      where: { id },
    });

    if (!inspectionDetail) {
      throw new NotFoundException('Inspection detail not found');
    }

    return plainToInstance(InspectionDetailResponseDto, inspectionDetail, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateInspectionDetailDto: UpdateInspectionDetailDto,
  ) {
    const inspectionDetail = await this.inspectionDetailRepository.findOne({
      where: { id },
    });

    if (!inspectionDetail) {
      throw new NotFoundException('Inspection detail not found');
    }

    Object.assign(inspectionDetail, updateInspectionDetailDto);
    const updatedInspectionDetail =
      await this.inspectionDetailRepository.save(inspectionDetail);

    return plainToInstance(
      InspectionDetailResponseDto,
      updatedInspectionDetail,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string) {
    const inspectionDetail = await this.inspectionDetailRepository.findOne({
      where: { id },
    });

    if (!inspectionDetail) {
      throw new NotFoundException('Inspection detail not found');
    }

    return await this.inspectionDetailRepository.softDelete(id);
  }
}

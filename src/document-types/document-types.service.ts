import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { DocumentType } from './entities/document-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTypeFilterDto } from './dto/document-type-filter.dto';
import { DocumentTypeResponseDto } from './dto/document-type-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DocumentTypesService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  async create(createDocumentTypeDto: CreateDocumentTypeDto) {
    const documentType = this.documentTypeRepository.create(
      createDocumentTypeDto,
    );
    const savedDocumentType =
      await this.documentTypeRepository.save(documentType);
    return plainToInstance(DocumentTypeResponseDto, savedDocumentType, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(filter: DocumentTypeFilterDto): Promise<{
    data: DocumentTypeResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page, limit, sort, sortBy, ...filterData } = filter;
    const skip = (page - 1) * limit;
    const take = limit;
    const query =
      this.documentTypeRepository.createQueryBuilder('documentType');

    Object.keys(filterData).forEach((key) => {
      if (filterData[key]) {
        query.andWhere(`documentType.${key} LIKE :${key}`, {
          [key]: `%${filterData[key]}%`,
        });
      }
    });

    const [documentTypes, total] = await query
      .skip(skip)
      .take(take)
      .orderBy(`documentType.${sortBy}`, sort)
      .getManyAndCount();

    if (documentTypes.length === 0) {
      throw new NotFoundException('No document types found');
    }

    const totalPages = Math.ceil(total / limit);
    return {
      data: documentTypes.map((documentType) =>
        plainToInstance(DocumentTypeResponseDto, documentType, {
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
    const documentType = await this.documentTypeRepository.findOne({
      where: { id },
    });
    if (!documentType) {
      throw new NotFoundException('Document type not found');
    }
    return plainToInstance(DocumentTypeResponseDto, documentType, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    const documentType = await this.documentTypeRepository.findOne({
      where: { id },
    });
    if (!documentType) {
      throw new NotFoundException('Document type not found');
    }

    Object.assign(documentType, updateDocumentTypeDto);
    const updatedDocumentType =
      await this.documentTypeRepository.save(documentType);

    return plainToInstance(DocumentTypeResponseDto, updatedDocumentType, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    const documentType = await this.documentTypeRepository.findOne({
      where: { id },
    });
    if (!documentType) {
      throw new NotFoundException('Document type not found');
    }
    return await this.documentTypeRepository.softDelete(id);
  }
}

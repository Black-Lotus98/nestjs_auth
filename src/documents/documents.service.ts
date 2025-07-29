import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentFilterDto } from './dto/document-filter.dto';
import { DocumentResponseDto } from './dto/document-response.dto';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    // Check if user exists
    const user = await this.userRepository.findOne({
      where: { id: createDocumentDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createDocumentDto.userId} not found`,
      );
    }

    // Check if document type exists
    const documentType = await this.documentTypeRepository.findOne({
      where: { id: createDocumentDto.documentTypeId },
    });

    if (!documentType) {
      throw new NotFoundException(
        `Document type with ID ${createDocumentDto.documentTypeId} not found`,
      );
    }

    const document = this.documentRepository.create(createDocumentDto);
    const savedDocument = await this.documentRepository.save(document);

    return plainToInstance(DocumentResponseDto, savedDocument, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(filter: DocumentFilterDto): Promise<{
    data: DocumentResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page, limit, sort, sortBy, ...filterData } = filter;
    const skip = (page - 1) * limit;
    const take = limit;
    const query = this.documentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.user', 'user')
      .leftJoinAndSelect('document.documentType', 'documentType');

    Object.keys(filterData).forEach((key) => {
      if (filterData[key]) {
        query.andWhere(`document.${key} LIKE :${key}`, {
          [key]: `%${filterData[key]}%`,
        });
      }
    });

    const [documents, total] = await query
      .skip(skip)
      .take(take)
      .orderBy(`document.${sortBy}`, sort)
      .getManyAndCount();

    if (documents.length === 0) {
      throw new NotFoundException('No documents found');
    }

    const totalPages = Math.ceil(total / limit);
    return {
      data: documents.map((document) =>
        plainToInstance(DocumentResponseDto, document, {
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
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: ['user', 'documentType'],
    });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return plainToInstance(DocumentResponseDto, document, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentRepository.findOne({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // Check if user exists if userId is being updated
    if (updateDocumentDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateDocumentDto.userId },
      });

      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateDocumentDto.userId} not found`,
        );
      }
    }

    // Check if document type exists if documentTypeId is being updated
    if (updateDocumentDto.documentTypeId) {
      const documentType = await this.documentTypeRepository.findOne({
        where: { id: updateDocumentDto.documentTypeId },
      });

      if (!documentType) {
        throw new NotFoundException(
          `Document type with ID ${updateDocumentDto.documentTypeId} not found`,
        );
      }
    }

    Object.assign(document, updateDocumentDto);
    const updatedDocument = await this.documentRepository.save(document);

    return plainToInstance(DocumentResponseDto, updatedDocument, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    const document = await this.documentRepository.findOne({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return await this.documentRepository.softDelete(id);
  }
}

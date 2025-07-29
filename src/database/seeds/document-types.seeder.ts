import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from 'src/document-types/entities/document-type.entity';

@Injectable()
export class DocumentTypesSeeder {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  async seed() {
    console.log('🌱 Seeding document types...');

    const documentTypes = [
      {
        type: 'Passport',
        description: 'National passport or travel document',
      },
      {
        type: 'National ID',
        description: 'National identification card',
      },
      {
        type: 'Driver License',
        description: 'Vehicle driver license',
      },
      {
        type: 'Work Permit',
        description: 'Employment authorization document',
      },
      {
        type: 'Visa',
        description: 'Entry visa or residence permit',
      },
      {
        type: 'Birth Certificate',
        description: 'Official birth registration document',
      },
      {
        type: 'Medical Certificate',
        description: 'Health examination certificate',
      },
      {
        type: 'Insurance Card',
        description: 'Health or vehicle insurance document',
      },
    ];

    for (const typeData of documentTypes) {
      const existingType = await this.documentTypeRepository.findOne({
        where: { type: typeData.type },
      });

      if (!existingType) {
        const documentType = this.documentTypeRepository.create(typeData);
        await this.documentTypeRepository.save(documentType);
        console.log(`✅ Created document type: ${typeData.type}`);
      } else {
        console.log(`⏭️  Document type already exists: ${typeData.type}`);
      }
    }

    console.log('✅ Document types seeding completed!');
  }
}

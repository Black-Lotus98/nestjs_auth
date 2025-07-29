import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from 'src/documents/entities/document.entity';
import { User } from 'src/user/entities/user.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';

@Injectable()
export class DocumentsSeeder {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  async seed() {
    console.log('🌱 Seeding documents...');

    // Get existing users and document types
    const users = await this.userRepository.find({
      take: 3, // Create documents for first 3 users
    });

    const documentTypes = await this.documentTypeRepository.find({
      take: 4, // Use first 4 document types
    });

    if (documentTypes.length === 0) {
      console.log(
        '❌ No document types found. Please run document types seeder first.',
      );
      return;
    }

    for (const user of users) {
      // Create 2-3 documents per user
      for (let i = 0; i < Math.min(3, documentTypes.length); i++) {
        const documentType = documentTypes[i];
        const issueDate = new Date();
        issueDate.setFullYear(issueDate.getFullYear() - (i + 1)); // 1, 2, 3 years ago

        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + (5 - i)); // 5, 4, 3 years from now

        const documentData = {
          userId: user.id,
          documentTypeId: documentType.id,
          documentNumber: `${documentType.type.toUpperCase()}-${user.id.slice(0, 8)}-${i + 1}`,
          issueDate,
          expiryDate,
          imageUrl: `https://ui-avatars.com/api/?name=${documentType.type}&background=random&size=200`,
        };

        const existingDocument = await this.documentRepository.findOne({
          where: {
            userId: user.id,
            documentTypeId: documentType.id,
          },
        });

        if (!existingDocument) {
          const document = this.documentRepository.create(documentData);
          await this.documentRepository.save(document);
          console.log(
            `✅ Created ${documentType.type} for user: ${user.email}`,
          );
        } else {
          console.log(
            `⏭️  ${documentType.type} already exists for user: ${user.email}`,
          );
        }
      }
    }

    console.log('✅ Documents seeding completed!');
  }
}

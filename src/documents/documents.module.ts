import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { User } from 'src/user/entities/user.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, User, DocumentType])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}

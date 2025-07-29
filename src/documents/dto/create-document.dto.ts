import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'The user ID',
    example: 'user-uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The document type ID',
    example: 'document-type-uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  documentTypeId: string;

  @ApiProperty({
    description: 'The document number',
    example: 'PASSPORT-12345678-1',
  })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({
    description: 'Document issue date',
    example: '2023-01-01',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  issueDate: Date;

  @ApiProperty({
    description: 'Document expiry date',
    example: '2028-01-01',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({
    description: 'Document image URL',
    example: 'https://example.com/document.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

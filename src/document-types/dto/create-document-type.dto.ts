import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentTypeDto {
  @ApiProperty({
    description: 'The document type name',
    example: 'Passport',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'The document type description',
    example: 'National passport or travel document',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

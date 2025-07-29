import { ApiProperty } from '@nestjs/swagger';

export class DocumentTypeResponseDto {
  @ApiProperty({ description: 'The document type ID' })
  id: string;

  @ApiProperty({ description: 'The document type name' })
  type: string;

  @ApiProperty({ description: 'The document type description' })
  description: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}

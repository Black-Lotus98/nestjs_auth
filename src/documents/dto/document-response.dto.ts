import { ApiProperty } from '@nestjs/swagger';

export class DocumentResponseDto {
  @ApiProperty({ description: 'The document ID' })
  id: string;

  @ApiProperty({ description: 'The user ID' })
  userId: string;

  @ApiProperty({ description: 'The document type ID' })
  documentTypeId: string;

  @ApiProperty({ description: 'The document number' })
  documentNumber: string;

  @ApiProperty({ description: 'Document issue date' })
  issueDate: Date;

  @ApiProperty({ description: 'Document expiry date' })
  expiryDate: Date;

  @ApiProperty({ description: 'Document image URL' })
  imageUrl: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}

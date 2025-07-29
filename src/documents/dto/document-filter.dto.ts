import { FilterDto } from 'src/common/dto/filter.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class DocumentFilterDto extends FilterDto {
  @ApiProperty({
    description: 'Filter by user ID',
    example: 'user-uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'Filter by document type ID',
    example: 'document-type-uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  documentTypeId?: string;

  @ApiProperty({
    description: 'Filter by document number',
    example: 'PASSPORT',
    required: false,
  })
  @IsString()
  @IsOptional()
  documentNumber?: string;
}

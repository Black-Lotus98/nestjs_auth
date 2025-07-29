import { FilterDto } from 'src/common/dto/filter.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DocumentTypeFilterDto extends FilterDto {
  @ApiProperty({
    description: 'Filter by document type name',
    example: 'Passport',
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'Filter by document type description',
    example: 'travel document',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

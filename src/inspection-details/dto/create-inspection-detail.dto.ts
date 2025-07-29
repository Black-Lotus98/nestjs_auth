import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateInspectionDetailDto {
  @ApiProperty({
    description: 'The inspection item name',
    example: 'Vehicle Safety Check',
  })
  @IsString()
  @IsNotEmpty()
  inspectionItem: string;

  @ApiProperty({
    description: 'The inspection item description',
    example: 'Comprehensive vehicle safety inspection',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Additional notes about the inspection item',
    example: 'Check all safety equipment',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Maximum score for this inspection item',
    example: 10.0,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }) => parseFloat(value))
  maxScore: number;
}

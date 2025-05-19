import { IsNotEmpty, IsNumber, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortByEnum, SortEnum } from '../enums/sort.enum';

export class FilterDto {
  @ApiProperty({
    description: 'Maximum number of records to return',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    description: 'Sort by field',
    example: SortByEnum.id,
    enum: SortByEnum,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(SortByEnum)
  sortBy: SortByEnum;

  @ApiProperty({
    description: 'Sort order for the results',
    example: SortEnum.ASC,
    enum: SortEnum,
  })
  @IsEnum(SortEnum)
  @IsNotEmpty()
  sort: SortEnum;
}

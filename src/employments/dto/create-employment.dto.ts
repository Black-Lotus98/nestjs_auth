import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmploymentDto {
  @ApiProperty({
    description: 'The driver ID',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({
    description: 'The start date of the employment',
    example: '2021-01-01',
  })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the employment',
    example: '2021-01-01',
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  endDate: Date;
}

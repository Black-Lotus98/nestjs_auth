import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class CreateTailingRecordDto {
  @ApiProperty({
    description: 'The driver ID',
    example: 'driver-uuid',
  })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({
    description: 'The inspection date',
    example: '2023-01-01',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  inspectionDate: Date;

  @ApiProperty({
    description: 'Start time of the tailing',
    example: '08:00:00',
  })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    description: 'End time of the tailing',
    example: '17:00:00',
  })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({
    description: 'Starting place of the tailing',
    example: 'Warehouse A',
  })
  @IsString()
  @IsNotEmpty()
  startPlace: string;

  @ApiProperty({
    description: 'Finishing place of the tailing',
    example: 'Distribution Center B',
  })
  @IsString()
  @IsNotEmpty()
  finishPlace: string;

  @ApiProperty({
    description: 'Distance traveled in kilometers',
    example: 150.5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  distance: number;

  @ApiProperty({
    description: 'Additional notes about the tailing record',
    example: 'Good weather conditions, no issues',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

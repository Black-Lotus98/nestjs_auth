import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DriverStatus } from 'src/common/enums/drivers/driver-status.enum';

export class CreateDriverDto {
  @ApiProperty({
    description: 'The user ID',
    example: 'user-uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The driver code',
    example: 'DRV001',
    required: false,
  })
  @IsString()
  @IsOptional()
  driverCode?: string;

  @ApiProperty({
    description: 'The status of the driver',
    example: DriverStatus.ACTIVE,
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: DriverStatus;

  @ApiProperty({
    description: 'The truck experience of the driver',
    example: '5 years',
    required: false,
  })
  @IsString()
  @IsOptional()
  truckExperience?: string;

  @ApiProperty({
    description: 'The tankers experience of the driver',
    example: '3 years',
    required: false,
  })
  @IsString()
  @IsOptional()
  tankersExperience?: string;

  @ApiProperty({
    description: 'The driver photo URL',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  driverPhoto?: string;
}

import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DriverStatus } from 'src/common/enums/drivers/driver-status.enum';
import { CreateEmploymentDto } from 'src/employments/dto/create-employment.dto';

export class CreateDriverDto {
  @ApiProperty({
    description: 'The national ID of the driver',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  nationalId: string;

  @ApiProperty({
    description: 'The first name of the driver',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The middle name of the driver',
    example: 'Robert',
    required: false,
  })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({
    description: 'The last name of the driver',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The Arabic name of the driver',
    example: 'جون دو',
  })
  @IsString()
  @IsNotEmpty()
  arabicName: string;

  @ApiProperty({
    description: 'The date of birth of the driver',
    example: '1990-01-01',
  })
  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

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
    description: 'The phone number of the driver',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

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

  @ApiProperty({
    description: 'The employments of the driver',
    example: [
      {
        startDate: '2021-01-01',
        endDate: '2021-01-01',
      },
    ],
  })
  @IsArray()
  @IsOptional()
  employments?: CreateEmploymentDto[];
}

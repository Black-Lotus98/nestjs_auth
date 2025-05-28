import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from 'src/common/dto/filter.dto';
import { DriverStatus } from 'src/common/enums/drivers/driver-status.enum';

export class DriverFilterDto extends FilterDto {
  @ApiPropertyOptional({
    description: 'Driver first name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({
    description: 'Driver last name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    description: 'Driver national ID',
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  nationalId: string;

  @ApiPropertyOptional({
    description: 'Driver arabic name',
    example: 'جون دو',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  arabicName: string;

  @ApiPropertyOptional({
    description: 'Driver phone',
    example: '+1234567890',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiPropertyOptional({
    description: 'Driver status',
    example: DriverStatus.SPOT,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  status: DriverStatus;
}

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

export class UserFilterDto extends FilterDto {
  @ApiPropertyOptional({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    description: 'User arabic first name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  arabicFirstName: string;

  @ApiPropertyOptional({
    description: 'User arabic last name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  arabicLastName: string;

  @ApiPropertyOptional({
    description: 'User email',
    example: 'qusaifannoun@gmail.com',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'User role',
    example: 'admin',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  role: string;

  @ApiPropertyOptional({
    description: 'User permission',
    example: 'admin',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  permission: string;
}

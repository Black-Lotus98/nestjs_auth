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
    description: 'User username',
    example: 'johndoe',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'User phone',
    example: '+1234567890',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phone: string;
}

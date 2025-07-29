import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  IsUUID,
  IsDate,
  ValidateNested,
} from 'class-validator';

import { IsNotEmpty } from 'class-validator';
import { CreatePhoneDto } from 'src/phones/dto/create-phone.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The middle name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The arabic first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  arabicFirstName: string;

  @ApiProperty({
    description: 'The arabic middle name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  arabicMiddleName: string;

  @ApiProperty({
    description: 'The arabic last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  arabicLastName: string;

  @ApiProperty({
    description: 'The date of birth of the user',
    example: '1990-01-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  dob: Date;

  @ApiProperty({
    description: 'The email of the user',
    example: 'qusaifannoun@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The phone numbers of the user',
    example: [
      {
        phoneNumber: '+1234567890',
        phoneType: 'mobile',
        isPrimary: true,
      },
      {
        phoneNumber: '+1234567890',
        phoneType: 'home',
        isPrimary: false,
      },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePhoneDto)
  @IsOptional()
  phones: CreatePhoneDto[];

  @ApiProperty({
    description: 'The profile picture of the user',
    example: 'https://example.com/profile.jpg',
  })
  @IsString()
  @IsOptional()
  profilePicture: string;

  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['admin', 'user'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  roleIds?: string[];

  @ApiProperty({
    description: 'The direct permissions assigned to the user',
    example: ['user:create', 'user:read'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  permissionIds?: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  IsUUID,
} from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john.doe',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
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
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St, Anytown, USA',
  })
  @IsString()
  @IsOptional()
  address: string;

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

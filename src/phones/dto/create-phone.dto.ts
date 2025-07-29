import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsUUID, IsNotEmpty } from 'class-validator';

export class CreatePhoneDto {
  @ApiProperty({ description: 'The phone number' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'The phone type' })
  @IsString()
  @IsNotEmpty()
  phoneType: string;

  @ApiProperty({ description: 'Whether the phone is primary' })
  @IsBoolean()
  isPrimary: boolean;

  @ApiProperty({ description: 'The user ID' })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}

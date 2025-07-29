import { ApiProperty } from '@nestjs/swagger';

export class PhoneResponse {
  @ApiProperty({ description: 'The ID of the phone' })
  id: string;

  @ApiProperty({ description: 'The phone number' })
  phoneNumber: string;

  @ApiProperty({ description: 'The phone type' })
  phoneType: string;

  @ApiProperty({ description: 'Whether the phone is primary' })
  isPrimary: boolean;
}

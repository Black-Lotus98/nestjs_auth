import { UserResponse } from './user.response';
import { ApiProperty } from '@nestjs/swagger';
export class SessionResponse {
  @ApiProperty({
    type: UserResponse,
    description: 'The user object',
    example: {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      firstName: 'Qusai',
      lastName: 'Fannoun',
      email: 'qusaifannoun@gmail.com',
    },
  })
  user: UserResponse;
}

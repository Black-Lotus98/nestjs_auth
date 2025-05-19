import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  phone: string;

  @Expose()
  address: string;

  @Expose()
  profilePicture: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  password: string;

  deletedAt: Date;
}

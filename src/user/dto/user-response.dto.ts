import { Exclude, Expose, Type } from 'class-transformer';
import { PermissionResponseDto } from 'src/permissions/dto/permission-response.dto';
import { RoleResponseDto } from 'src/roles/dto/roles-response.dto';

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

  @Expose()
  @Type(() => RoleResponseDto)
  roles: RoleResponseDto[];

  @Expose()
  @Type(() => PermissionResponseDto)
  permissions: PermissionResponseDto[];

  password: string;

  deletedAt: Date;
}

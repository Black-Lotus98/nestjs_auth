import { Exclude, Expose, Type } from 'class-transformer';
import { PermissionResponseDto } from 'src/permissions/dto/permission-response.dto';
import { PhoneResponse } from 'src/phones/dto/phones-response.dto';
import { RoleResponseDto } from 'src/roles/dto/roles-response.dto';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  middleName: string;

  @Expose()
  lastName: string;

  @Expose()
  arabicFirstName: string;

  @Expose()
  arabicMiddleName: string;

  @Expose()
  arabicLastName: string;

  @Expose()
  dob: Date;

  @Expose()
  email: string;

  @Expose()
  @Type(() => PhoneResponse)
  phones: PhoneResponse[];

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

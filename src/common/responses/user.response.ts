import { RoleResponseDto } from 'src/roles/dto/roles-response.dto';
import { PermissionResponseDto } from 'src/permissions/dto/permission-response.dto';
import { PhoneResponse } from 'src/phones/dto/phones-response.dto';
export class UserResponse {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  arabicFirstName: string;
  arabicMiddleName: string;
  arabicLastName: string;
  email: string;
  dob: Date;
  profilePicture: string;
  phones: PhoneResponse[];
  roles: RoleResponseDto[];
  permissions: PermissionResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}

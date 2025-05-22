import { RoleResponseDto } from 'src/roles/dto/roles-response.dto';
import { PermissionResponseDto } from 'src/permissions/dto/permission-response.dto';
export class UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  profilePicture: string;
  address: string;
  email: string;
  roles: RoleResponseDto[];
  permissions: PermissionResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}

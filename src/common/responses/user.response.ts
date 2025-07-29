import { RoleResponseDto } from 'src/roles/dto/roles-response.dto';
import { PermissionResponseDto } from 'src/permissions/dto/permission-response.dto';
import { PhoneResponse } from 'src/phones/dto/phones-response.dto';
import { DriverResponseDto } from 'src/drivers/dto/driver-response.dto';
import { EmploymentResponseDto } from 'src/employments/dto/employment-response.dto';
import { DocumentResponseDto } from 'src/documents/dto/document-response.dto';

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
  employments: EmploymentResponseDto[];
  documents: DocumentResponseDto[];
  driver?: DriverResponseDto;
  createdAt: Date;
  updatedAt: Date;
}

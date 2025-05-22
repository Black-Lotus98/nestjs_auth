import { Exclude, Expose, Type } from 'class-transformer';
import { PermissionResponseDto } from 'src/permissions/dto/permission-response.dto';
@Exclude()
export class RoleResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  @Type(() => PermissionResponseDto)
  permissions: PermissionResponseDto[];
}

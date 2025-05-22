import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class PermissionResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  code: string;
}

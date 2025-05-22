import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionResponseDto } from './dto/permission-response.dto';
import {
  GetAllPermissionsSwagger,
  GetPermissionByIdSwagger,
} from './permissions.swager';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('permissions')
@UseGuards(JwtGuard, RolesGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @GetAllPermissionsSwagger()
  async findAll(): Promise<PermissionResponseDto[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @GetPermissionByIdSwagger()
  async findOne(@Param('id') id: string): Promise<PermissionResponseDto> {
    return this.permissionsService.findOne(id);
  }
}

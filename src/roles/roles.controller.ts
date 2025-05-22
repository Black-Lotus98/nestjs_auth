import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleResponseDto } from './dto/roles-response.dto';
import { GetAllRolesSwagger, GetRoleByIdSwagger } from './roles.swager';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('roles')
@UseGuards(JwtGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @GetAllRolesSwagger()
  async findAll(): Promise<RoleResponseDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @GetRoleByIdSwagger()
  async findOne(@Param('id') id: string): Promise<RoleResponseDto> {
    return this.rolesService.findOne(id);
  }
}

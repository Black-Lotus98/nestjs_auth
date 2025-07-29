import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permissions.entity';
import { Role as RoleEnum } from 'src/common/enums/role.enum';
import { Permission as PermissionEnum } from 'src/common/enums/permission.enum';

@Injectable()
export class RolesSeeder {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async seed() {
    console.log('🌱 Seeding roles...');

    const roles = [
      {
        name: 'Super Admin',
        code: RoleEnum.SUPER_ADMIN,
        description: 'Super Administrator with all permissions',
        permissions: [
          PermissionEnum.USER_CREATE,
          PermissionEnum.USER_READ,
          PermissionEnum.USER_UPDATE,
          PermissionEnum.USER_DELETE,
        ],
      },
      {
        name: 'Admin',
        code: RoleEnum.ADMIN,
        description: 'Administrator with most permissions',
        permissions: [
          PermissionEnum.USER_CREATE,
          PermissionEnum.USER_READ,
          PermissionEnum.USER_UPDATE,
        ],
      },
      {
        name: 'User',
        code: RoleEnum.USER,
        description: 'Regular user with basic permissions',
        permissions: [PermissionEnum.USER_READ],
      },
    ];

    for (const roleData of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { code: roleData.code },
        relations: ['permissions'],
      });

      if (!existingRole) {
        // Get permissions for this role
        const permissions = await this.permissionRepository.find({
          where: roleData.permissions.map((code) => ({ code })),
        });

        const role = this.roleRepository.create({
          name: roleData.name,
          code: roleData.code,
          permissions,
        });

        await this.roleRepository.save(role);
        console.log(`✅ Created role: ${roleData.name}`);
      } else {
        console.log(`⏭️  Role already exists: ${roleData.name}`);
      }
    }

    console.log('✅ Roles seeding completed!');
  }
}

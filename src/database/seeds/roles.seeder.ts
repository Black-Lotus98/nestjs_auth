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
          // User permissions
          PermissionEnum.USER_CREATE,
          PermissionEnum.USER_READ,
          PermissionEnum.USER_UPDATE,
          PermissionEnum.USER_DELETE,
          // Phone permissions
          PermissionEnum.PHONE_CREATE,
          PermissionEnum.PHONE_READ,
          PermissionEnum.PHONE_UPDATE,
          PermissionEnum.PHONE_DELETE,
          // Driver permissions
          PermissionEnum.DRIVER_CREATE,
          PermissionEnum.DRIVER_READ,
          PermissionEnum.DRIVER_UPDATE,
          PermissionEnum.DRIVER_DELETE,
          // Employment permissions
          PermissionEnum.EMPLOYMENT_CREATE,
          PermissionEnum.EMPLOYMENT_READ,
          PermissionEnum.EMPLOYMENT_UPDATE,
          PermissionEnum.EMPLOYMENT_DELETE,
          // Document permissions
          PermissionEnum.DOCUMENT_CREATE,
          PermissionEnum.DOCUMENT_READ,
          PermissionEnum.DOCUMENT_UPDATE,
          PermissionEnum.DOCUMENT_DELETE,
          // Document Type permissions
          PermissionEnum.DOCUMENT_TYPE_CREATE,
          PermissionEnum.DOCUMENT_TYPE_READ,
          PermissionEnum.DOCUMENT_TYPE_UPDATE,
          PermissionEnum.DOCUMENT_TYPE_DELETE,
          // Inspection Detail permissions
          PermissionEnum.INSPECTION_DETAIL_CREATE,
          PermissionEnum.INSPECTION_DETAIL_READ,
          PermissionEnum.INSPECTION_DETAIL_UPDATE,
          PermissionEnum.INSPECTION_DETAIL_DELETE,
          // Tailing Record permissions
          PermissionEnum.TAILING_RECORD_CREATE,
          PermissionEnum.TAILING_RECORD_READ,
          PermissionEnum.TAILING_RECORD_UPDATE,
          PermissionEnum.TAILING_RECORD_DELETE,
          // Tailing Grade permissions
          PermissionEnum.TAILING_GRADE_CREATE,
          PermissionEnum.TAILING_GRADE_READ,
          PermissionEnum.TAILING_GRADE_UPDATE,
          PermissionEnum.TAILING_GRADE_DELETE,
        ],
      },
      {
        name: 'Admin',
        code: RoleEnum.ADMIN,
        description: 'Administrator with most permissions',
        permissions: [
          // User permissions
          PermissionEnum.USER_CREATE,
          PermissionEnum.USER_READ,
          PermissionEnum.USER_UPDATE,
          // Phone permissions
          PermissionEnum.PHONE_CREATE,
          PermissionEnum.PHONE_READ,
          PermissionEnum.PHONE_UPDATE,
          // Driver permissions
          PermissionEnum.DRIVER_CREATE,
          PermissionEnum.DRIVER_READ,
          PermissionEnum.DRIVER_UPDATE,
          // Employment permissions
          PermissionEnum.EMPLOYMENT_CREATE,
          PermissionEnum.EMPLOYMENT_READ,
          PermissionEnum.EMPLOYMENT_UPDATE,
          // Document permissions
          PermissionEnum.DOCUMENT_CREATE,
          PermissionEnum.DOCUMENT_READ,
          PermissionEnum.DOCUMENT_UPDATE,
          // Document Type permissions
          PermissionEnum.DOCUMENT_TYPE_CREATE,
          PermissionEnum.DOCUMENT_TYPE_READ,
          PermissionEnum.DOCUMENT_TYPE_UPDATE,
          // Inspection Detail permissions
          PermissionEnum.INSPECTION_DETAIL_CREATE,
          PermissionEnum.INSPECTION_DETAIL_READ,
          PermissionEnum.INSPECTION_DETAIL_UPDATE,
          // Tailing Record permissions
          PermissionEnum.TAILING_RECORD_CREATE,
          PermissionEnum.TAILING_RECORD_READ,
          PermissionEnum.TAILING_RECORD_UPDATE,
          // Tailing Grade permissions
          PermissionEnum.TAILING_GRADE_CREATE,
          PermissionEnum.TAILING_GRADE_READ,
          PermissionEnum.TAILING_GRADE_UPDATE,
        ],
      },
      {
        name: 'User',
        code: RoleEnum.USER,
        description: 'Regular user with basic permissions',
        permissions: [
          PermissionEnum.USER_READ,
          PermissionEnum.PHONE_READ,
          PermissionEnum.DRIVER_READ,
          PermissionEnum.EMPLOYMENT_READ,
          PermissionEnum.DOCUMENT_READ,
          PermissionEnum.DOCUMENT_TYPE_READ,
          PermissionEnum.INSPECTION_DETAIL_READ,
          PermissionEnum.TAILING_RECORD_READ,
          PermissionEnum.TAILING_GRADE_READ,
        ],
      },
    ];

    for (const roleData of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { code: roleData.code },
        relations: ['permissions'],
      });

      // Get all permissions for this role
      const permissions = await this.permissionRepository.find({
        where: roleData.permissions.map((code) => ({ code })),
      });

      if (!existingRole) {
        // Create new role
        const role = this.roleRepository.create({
          name: roleData.name,
          code: roleData.code,
          permissions,
        });

        await this.roleRepository.save(role);
        console.log(`✅ Created role: ${roleData.name}`);
      } else {
        // Update existing role with new permissions
        existingRole.permissions = permissions;
        await this.roleRepository.save(existingRole);
        console.log(`✅ Updated role: ${roleData.name} with new permissions`);
      }
    }

    console.log('✅ Roles seeding completed!');
  }
}

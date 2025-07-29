import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'src/permissions/entities/permissions.entity';
import { Permission as PermissionEnum } from 'src/common/enums/permission.enum';

@Injectable()
export class PermissionsSeeder {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async seed() {
    console.log('🌱 Seeding permissions...');

    const permissions = [
      {
        name: 'Create User',
        code: PermissionEnum.USER_CREATE,
      },
      {
        name: 'Read User',
        code: PermissionEnum.USER_READ,
      },
      {
        name: 'Update User',
        code: PermissionEnum.USER_UPDATE,
      },
      {
        name: 'Delete User',
        code: PermissionEnum.USER_DELETE,
      },
    ];

    for (const permissionData of permissions) {
      const existingPermission = await this.permissionRepository.findOne({
        where: { code: permissionData.code },
      });

      if (!existingPermission) {
        const permission = this.permissionRepository.create(permissionData);
        await this.permissionRepository.save(permission);
        console.log(`✅ Created permission: ${permissionData.name}`);
      } else {
        console.log(`⏭️  Permission already exists: ${permissionData.name}`);
      }
    }

    console.log('✅ Permissions seeding completed!');
  }
}

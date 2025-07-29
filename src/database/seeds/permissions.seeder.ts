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
      // USER PERMISSIONS
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
      // PHONE PERMISSIONS
      {
        name: 'Create Phone',
        code: PermissionEnum.PHONE_CREATE,
      },
      {
        name: 'Read Phone',
        code: PermissionEnum.PHONE_READ,
      },
      {
        name: 'Update Phone',
        code: PermissionEnum.PHONE_UPDATE,
      },
      {
        name: 'Delete Phone',
        code: PermissionEnum.PHONE_DELETE,
      },
      // DRIVER PERMISSIONS
      {
        name: 'Create Driver',
        code: PermissionEnum.DRIVER_CREATE,
      },
      {
        name: 'Read Driver',
        code: PermissionEnum.DRIVER_READ,
      },
      {
        name: 'Update Driver',
        code: PermissionEnum.DRIVER_UPDATE,
      },
      {
        name: 'Delete Driver',
        code: PermissionEnum.DRIVER_DELETE,
      },
      // EMPLOYMENT PERMISSIONS
      {
        name: 'Create Employment',
        code: PermissionEnum.EMPLOYMENT_CREATE,
      },
      {
        name: 'Read Employment',
        code: PermissionEnum.EMPLOYMENT_READ,
      },
      {
        name: 'Update Employment',
        code: PermissionEnum.EMPLOYMENT_UPDATE,
      },
      {
        name: 'Delete Employment',
        code: PermissionEnum.EMPLOYMENT_DELETE,
      },
      // DOCUMENT PERMISSIONS
      {
        name: 'Create Document',
        code: PermissionEnum.DOCUMENT_CREATE,
      },
      {
        name: 'Read Document',
        code: PermissionEnum.DOCUMENT_READ,
      },
      {
        name: 'Update Document',
        code: PermissionEnum.DOCUMENT_UPDATE,
      },
      {
        name: 'Delete Document',
        code: PermissionEnum.DOCUMENT_DELETE,
      },
      // DOCUMENT TYPE PERMISSIONS
      {
        name: 'Create Document Type',
        code: PermissionEnum.DOCUMENT_TYPE_CREATE,
      },
      {
        name: 'Read Document Type',
        code: PermissionEnum.DOCUMENT_TYPE_READ,
      },
      {
        name: 'Update Document Type',
        code: PermissionEnum.DOCUMENT_TYPE_UPDATE,
      },
      {
        name: 'Delete Document Type',
        code: PermissionEnum.DOCUMENT_TYPE_DELETE,
      },
      // INSPECTION DETAIL PERMISSIONS
      {
        name: 'Create Inspection Detail',
        code: PermissionEnum.INSPECTION_DETAIL_CREATE,
      },
      {
        name: 'Read Inspection Detail',
        code: PermissionEnum.INSPECTION_DETAIL_READ,
      },
      {
        name: 'Update Inspection Detail',
        code: PermissionEnum.INSPECTION_DETAIL_UPDATE,
      },
      {
        name: 'Delete Inspection Detail',
        code: PermissionEnum.INSPECTION_DETAIL_DELETE,
      },
      // TAILING RECORD PERMISSIONS
      {
        name: 'Create Tailing Record',
        code: PermissionEnum.TAILING_RECORD_CREATE,
      },
      {
        name: 'Read Tailing Record',
        code: PermissionEnum.TAILING_RECORD_READ,
      },
      {
        name: 'Update Tailing Record',
        code: PermissionEnum.TAILING_RECORD_UPDATE,
      },
      {
        name: 'Delete Tailing Record',
        code: PermissionEnum.TAILING_RECORD_DELETE,
      },
      // TAILING GRADE PERMISSIONS
      {
        name: 'Create Tailing Grade',
        code: PermissionEnum.TAILING_GRADE_CREATE,
      },
      {
        name: 'Read Tailing Grade',
        code: PermissionEnum.TAILING_GRADE_READ,
      },
      {
        name: 'Update Tailing Grade',
        code: PermissionEnum.TAILING_GRADE_UPDATE,
      },
      {
        name: 'Delete Tailing Grade',
        code: PermissionEnum.TAILING_GRADE_DELETE,
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

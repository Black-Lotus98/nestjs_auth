import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeeder } from './database.seeder';
import { PermissionsSeeder } from './permissions.seeder';
import { RolesSeeder } from './roles.seeder';
import { UsersSeeder } from './users.seeder';
import { DriversSeeder } from './drivers.seeder';
import { EmploymentsSeeder } from './employments.seeder';
import { DocumentTypesSeeder } from './document-types.seeder';
import { DocumentsSeeder } from './documents.seeder';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permissions.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Employment } from 'src/employments/entities/employment.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';
import { Document } from 'src/documents/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Permission,
      Driver,
      Employment,
      DocumentType,
      Document,
    ]),
  ],
  providers: [
    DatabaseSeeder,
    PermissionsSeeder,
    RolesSeeder,
    UsersSeeder,
    DriversSeeder,
    EmploymentsSeeder,
    DocumentTypesSeeder,
    DocumentsSeeder,
  ],
  exports: [DatabaseSeeder],
})
export class SeederModule {}

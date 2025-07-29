import { Injectable } from '@nestjs/common';
import { PermissionsSeeder } from './permissions.seeder';
import { RolesSeeder } from './roles.seeder';
import { UsersSeeder } from './users.seeder';
import { DriversSeeder } from './drivers.seeder';
import { EmploymentsSeeder } from './employments.seeder';
import { DocumentTypesSeeder } from './document-types.seeder';
import { DocumentsSeeder } from './documents.seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private readonly permissionsSeeder: PermissionsSeeder,
    private readonly rolesSeeder: RolesSeeder,
    private readonly usersSeeder: UsersSeeder,
    private readonly driversSeeder: DriversSeeder,
    private readonly employmentsSeeder: EmploymentsSeeder,
    private readonly documentTypesSeeder: DocumentTypesSeeder,
    private readonly documentsSeeder: DocumentsSeeder,
  ) {}

  async seed() {
    console.log('🚀 Starting database seeding...\n');

    try {
      // Seed in order: permissions -> roles -> users -> drivers -> employments -> document types -> documents
      await this.permissionsSeeder.seed();
      console.log('');

      await this.rolesSeeder.seed();
      console.log('');

      await this.usersSeeder.seed();
      console.log('');

      await this.driversSeeder.seed();
      console.log('');

      await this.employmentsSeeder.seed();
      console.log('');

      await this.documentTypesSeeder.seed();
      console.log('');

      await this.documentsSeeder.seed();
      console.log('');

      console.log('🎉 Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }
}

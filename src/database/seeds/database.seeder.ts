import { Injectable } from '@nestjs/common';
import { PermissionsSeeder } from './permissions.seeder';
import { RolesSeeder } from './roles.seeder';
import { UsersSeeder } from './users.seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private readonly permissionsSeeder: PermissionsSeeder,
    private readonly rolesSeeder: RolesSeeder,
    private readonly usersSeeder: UsersSeeder,
  ) {}

  async seed() {
    console.log('🚀 Starting database seeding...\n');

    try {
      // Seed in order: permissions -> roles -> users
      await this.permissionsSeeder.seed();
      console.log('');

      await this.rolesSeeder.seed();
      console.log('');

      await this.usersSeeder.seed();
      console.log('');

      console.log('🎉 Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }
}

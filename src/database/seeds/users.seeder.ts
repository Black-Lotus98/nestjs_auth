import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Role as RoleEnum } from 'src/common/enums/role.enum';

@Injectable()
export class UsersSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed() {
    console.log('🌱 Seeding users...');

    const users = [
      {
        firstName: 'Qusai',
        middleName: 'Kamal',
        lastName: 'Fannoun',
        arabicFirstName: 'قصي',
        arabicMiddleName: 'كمال',
        arabicLastName: 'فنون',
        email: 'qusaifannoun@gmail.com',
        dob: new Date('1998-08-22'),
        password: 'password',
        profilePicture: 'https://ui-avatars.com/api/?name=Qusai+Fannoun',
        roleCode: RoleEnum.SUPER_ADMIN,
      },
    ];

    for (const userData of users) {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
        relations: ['roles'],
      });

      if (!existingUser) {
        // Get the role for this user
        const role = await this.roleRepository.findOne({
          where: { code: userData.roleCode },
        });

        if (!role) {
          console.log(`❌ Role not found for code: ${userData.roleCode}`);
          continue;
        }

        const { roleCode, ...userCreateData } = userData;
        const user = this.userRepository.create({
          ...userCreateData,
          roles: [role],
        });

        await this.userRepository.save(user);
        console.log(`✅ Created user: ${userData.email}`);
      } else {
        console.log(`⏭️  User already exists: ${userData.email}`);
      }
    }

    console.log('✅ Users seeding completed!');
  }
}

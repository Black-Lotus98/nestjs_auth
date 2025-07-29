import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DriversSeeder {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed() {
    console.log('🌱 Seeding drivers...');

    // Get existing users to create drivers for
    const users = await this.userRepository.find({
      take: 2, // Create drivers for first 2 users
    });

    for (const user of users) {
      const existingDriver = await this.driverRepository.findOne({
        where: { userId: user.id },
      });

      if (!existingDriver) {
        const driverData = {
          userId: user.id,
          driverCode: `DRV-${user.id.slice(0, 8).toUpperCase()}`,
          status: 'ACTIVE',
          truckExperience: '5 years',
          tankersExperience: '3 years',
          driverPhoto: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`,
        };

        const driver = this.driverRepository.create(driverData);
        await this.driverRepository.save(driver);
        console.log(`✅ Created driver for user: ${user.email}`);
      } else {
        console.log(`⏭️  Driver already exists for user: ${user.email}`);
      }
    }

    console.log('✅ Drivers seeding completed!');
  }
}

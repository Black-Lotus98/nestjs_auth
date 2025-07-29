import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employment } from 'src/employments/entities/employment.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmploymentsSeeder {
  constructor(
    @InjectRepository(Employment)
    private employmentRepository: Repository<Employment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed() {
    console.log('🌱 Seeding employments...');

    // Get existing users to create employments for
    const users = await this.userRepository.find({
      take: 3, // Create employments for first 3 users
    });

    for (const user of users) {
      // Create 2 employment records per user
      for (let i = 0; i < 2; i++) {
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - (i + 1) * 2); // 2 years ago, 4 years ago

        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() - i * 2); // 0 years ago, 2 years ago

        const employmentData = {
          userId: user.id,
          startDate,
          endDate: i === 0 ? undefined : endDate, // First employment is current (no end date)
        };

        const existingEmployment = await this.employmentRepository.findOne({
          where: {
            userId: user.id,
            startDate,
          },
        });

        if (!existingEmployment) {
          const employment = this.employmentRepository.create(employmentData);
          await this.employmentRepository.save(employment);
          console.log(
            `✅ Created employment for user: ${user.email} (${startDate.toISOString().split('T')[0]} - ${endDate ? endDate.toISOString().split('T')[0] : 'Current'})`,
          );
        } else {
          console.log(`⏭️  Employment already exists for user: ${user.email}`);
        }
      }
    }

    console.log('✅ Employments seeding completed!');
  }
}

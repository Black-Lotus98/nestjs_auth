import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Employment } from 'src/employments/entities/employment.entity';

@Entity()
export class Driver extends BaseEntityWithSoftDelete {
  @Column()
  @Unique(['nationalId'])
  nationalId: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  arabicName: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  driverCode: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  truckExperience: string;

  @Column({ nullable: true })
  tankersExperience: string;

  @Column({ nullable: true })
  driverPhoto: string;

  @Column({ nullable: true })
  driverLicense: string;

  @OneToMany(() => Employment, (employment) => employment.driver, {
    cascade: true,
  })
  employments: Employment[];
}

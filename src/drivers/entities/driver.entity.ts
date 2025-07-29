import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TailingRecord } from 'src/tailing-records/entities/tailing-record.entity';

@Entity()
export class Driver extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  driverCode: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  truckExperience: string;

  @Column({ nullable: true })
  tankersExperience: string;

  @Column({ nullable: true })
  driverPhoto: string;

  @OneToMany(() => TailingRecord, (tailingRecord) => tailingRecord.driver)
  tailingRecords: TailingRecord[];
}

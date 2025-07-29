import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';
import { TailingGrade } from 'src/tailing-grades/entities/tailing-grade.entity';

@Entity()
export class TailingRecord extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  driverId: string;

  @Column({ type: 'date', nullable: false })
  inspectionDate: Date;

  @Column({ type: 'time', nullable: false })
  startTime: string;

  @Column({ type: 'time', nullable: false })
  endTime: string;

  @Column({ nullable: false })
  startPlace: string;

  @Column({ nullable: false })
  finishPlace: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  distance: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Driver, (driver) => driver.tailingRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @OneToMany(() => TailingGrade, (tailingGrade) => tailingGrade.tailingRecord, {
    cascade: true,
  })
  tailingGrades: TailingGrade[];
}

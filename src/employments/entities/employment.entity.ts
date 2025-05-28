import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, PrimaryColumn, ManyToOne, Entity, JoinColumn } from 'typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';

@Entity()
export class Employment extends BaseEntityWithSoftDelete {
  @PrimaryColumn()
  employeeId: string;

  @ManyToOne(() => Driver, (driver) => driver.employments)
  @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
  driver: Driver;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;
}

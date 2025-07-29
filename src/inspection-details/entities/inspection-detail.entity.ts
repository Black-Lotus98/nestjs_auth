import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TailingGrade } from 'src/tailing-grades/entities/tailing-grade.entity';

@Entity()
export class InspectionDetail extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  inspectionItem: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  maxScore: number;

  @OneToMany(
    () => TailingGrade,
    (tailingGrade) => tailingGrade.inspectionDetail,
  )
  tailingGrades: TailingGrade[];
}

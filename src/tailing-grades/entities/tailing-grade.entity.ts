import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TailingRecord } from 'src/tailing-records/entities/tailing-record.entity';
import { InspectionDetail } from 'src/inspection-details/entities/inspection-detail.entity';

@Entity()
export class TailingGrade extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  recordId: string;

  @Column({ nullable: false })
  itemId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  score: number;

  @ManyToOne(
    () => TailingRecord,
    (tailingRecord) => tailingRecord.tailingGrades,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'recordId' })
  tailingRecord: TailingRecord;

  @ManyToOne(
    () => InspectionDetail,
    (inspectionDetail) => inspectionDetail.tailingGrades,
    {
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn({ name: 'itemId' })
  inspectionDetail: InspectionDetail;
}

import { ApiProperty } from '@nestjs/swagger';
import { snowflake } from 'src/helps/common';
import { BaseEntity, Column, DeepPartial, Entity } from 'typeorm';

@Entity({
  name: 'scores',
})
export class ScoresEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'score_value',
    nullable: true,
  })
  @ApiProperty()
  scoreValue: number;

  @Column('bigint', {
    name: 'lecture_id',
    nullable: true,
  })
  @ApiProperty()
  lectureId: number;

  @Column('bigint', {
    name: 'student_id',
    nullable: true,
  })
  @ApiProperty()
  studentId: number;

  constructor(data: DeepPartial<ScoresEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

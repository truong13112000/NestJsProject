import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';
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
  @Min(0, {
    message: 'Score must be greater  than or equal to 0',
  })
  @Max(10, {
    message: 'Score must be less than or equal to 10',
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

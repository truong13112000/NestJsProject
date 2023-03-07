import { ApiProperty } from '@nestjs/swagger';
import { snowflake } from 'src/helps/common';
import { BaseEntity, Column, DeepPartial, Entity } from 'typeorm';

@Entity({
  name: 'students',
})
export class StudentsEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'student_name',
    length: 50,
    nullable: true,
  })
  @ApiProperty()
  studentName: string;

  @Column('bigint', {
    name: 'school_id',
    nullable: true,
  })
  @ApiProperty()
  schoolId: number;

  constructor(data: DeepPartial<StudentsEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

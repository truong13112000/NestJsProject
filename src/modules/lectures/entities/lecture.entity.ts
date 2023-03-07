import { ApiProperty } from '@nestjs/swagger';
import { snowflake } from 'src/helps/common';
import { BaseEntity, Column, DeepPartial, Entity } from 'typeorm';

@Entity({
  name: 'lecture',
})
export class LecturesEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'lecture_name',
    length: 50,
    nullable: true,
  })
  @ApiProperty()
  lecturelName: string;

  constructor(data: DeepPartial<LecturesEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { snowflake } from 'src/helps/common';
import { Entity, BaseEntity, Column, DeepPartial } from 'typeorm';

@Entity({
  name: 'schools',
})
export class SchoolsEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'school_name',
    length: 50,
    nullable: true,
  })
  @ApiProperty()
  schoolName: string;

  constructor(data: DeepPartial<SchoolsEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

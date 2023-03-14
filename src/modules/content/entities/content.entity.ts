import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity({
  name: 'contents',
})
export class ContentsEntity extends BaseEntity {
  @Column({
    name: 'title',
    primary: true,
  })
  @ApiProperty()
  title: string;
  @Column({
    name: 'content',
    nullable: true,
  })
  @ApiProperty()
  content: string;

  @Column({
    name: 'imageLink',
    nullable: true,
  })
  @ApiProperty()
  imageLink: string;
}

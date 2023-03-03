import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Column({ nullable: true })
  @ApiProperty()
  username: string;

  @Column({ nullable: true })
  @ApiProperty()
  email: string;
}

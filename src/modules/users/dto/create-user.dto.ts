import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user1',
  })
  username: string;

  @ApiProperty({
    example: '123456aA@',
  })
  password: string;

  @ApiProperty({
    example: 'user1@gmail.com',
  })
  @IsEmail()
  email: string;
}

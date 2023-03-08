import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    example: 'test',
  })
  username: string;

  @ApiProperty({
    example: '123456aA@',
  })
  password: string;
}

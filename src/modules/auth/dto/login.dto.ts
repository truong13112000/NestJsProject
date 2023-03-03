import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty({
    example: 'admin',
  })
  password: string;
}

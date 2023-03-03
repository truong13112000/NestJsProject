import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  username: string;

  @ApiProperty({
    example: 'admin',
  })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

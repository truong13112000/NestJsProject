import { RegisterDto } from './../dto/register.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.services';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginEntity } from '../entities/auth.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    description: '',
    type: LoginEntity,
  })
  // @UseTransform()
  login(@Body() input: LoginDto) {
    return this.authService.login(input);
    // return this.authService.login(input);
  }

  @Post('register')
  @ApiOperation({ summary: 'register' })
  @ApiBody({
    type: RegisterDto,
  })
  @ApiResponse({
    status: 200,
    description: '',
    type: RegisterDto,
  })
  // @UseTransform()
  register(@Body() input: RegisterDto) {
    return this.authService.register(input);
  }
}

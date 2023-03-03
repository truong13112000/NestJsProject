import { RegisterDto } from './../dto/register.dto';
import { LoginDto } from './../dto/login.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(input: LoginDto) {
    const { username, password } = input;
    // check UserName
    const checkUser = await this.userService.findByUsername(username);
    if (!checkUser) {
      throw new NotFoundException('User not found');
    }
    const passHash = checkUser.password;
    const comparePass = await this.userService.checkPassword(
      password,
      checkUser.password,
    );
    if (!comparePass) {
      throw new UnauthorizedException({ password, passHash }, 'Unauthorized');
    }
    const payload = { username: username, password: password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(input: RegisterDto) {
    const { username, password, email } = input;
    const checkUser = await this.userService.findByUsername(username);
    if (checkUser) {
      throw new BadRequestException('User exists');
    }
    await this.userService.create({ username, password, email });
    const payload = { username: username, password: password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

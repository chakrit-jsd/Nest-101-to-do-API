import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOne(signInDto.username);
    const result = await bcrypt.compare(signInDto.password, user?.password);

    if (!result) {
      throw new UnauthorizedException();
    }
    return await this.jwtService.signAsync({ id: user.id });
  }

  async signUp(signUpDto: SignUpDto) {
    return await this.userService.create(signUpDto);
  }
}

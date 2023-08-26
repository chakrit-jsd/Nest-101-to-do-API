import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('/signup')
  async create(@Body() signUpDto: SignUpDto) {
    return new ResponseUserDto(await this.authService.signUp(signUpDto));
  }
}

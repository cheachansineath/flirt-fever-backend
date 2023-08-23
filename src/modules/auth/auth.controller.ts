import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in.dto';
import { signUpDto } from './dto/sign-up.dto';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signup')
  singUup(@Body() signUpDto: signUpDto) {
    return this.authService.signUp(signUpDto.username, signUpDto.password, signUpDto.email);
  }
}
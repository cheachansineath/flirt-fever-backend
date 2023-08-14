import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpDto } from './dto/otp.dto';
import { Public } from '../auth/auth.guard';
import { UserService } from '../user/user.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService, private userService: UserService) {}

  @Public()
  @Post('verify')
  async create(@Body() otpDto: OtpDto) {
    const user = await this.userService.findByEmail(otpDto.email);
    if (user != null){
      const verify = await this.otpService.verifyOtp(user, otpDto.pin);
      await this.userService.updateVerify(verify, user.id);
      return {verify: verify}
    }
    throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Username is already taken' })
  }
}

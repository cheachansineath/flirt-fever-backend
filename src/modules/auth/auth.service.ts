import { Injectable, ForbiddenException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
    ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user === null || user?.password !== password) {
      throw new ForbiddenException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string, email: string): Promise<any> {
    const userByEmail = await this.userService.findByEmail(email);
    if (userByEmail === null) {
        const userByUsername = await this.userService.findByUsername(username);
        if (userByUsername === null) {
            let user = new User();
            user.username = username.toLowerCase()
            user.email = email
            user.password = password
            try {
              const pin = await this.otpService.sendOtp(email);
              await this.userService.saveUser(user);
              await this.otpService.saveOtp(user, pin)
              return { message: "Sign up successfully"};
            } catch {
              throw new InternalServerErrorException();
            }
        }
        throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Username is already taken'});
    }
    throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Email is already taken'});
  }
}
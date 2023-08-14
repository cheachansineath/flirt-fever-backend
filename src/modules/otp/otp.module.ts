import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { EmailService } from 'src/providers/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), UserModule],
  controllers: [OtpController],
  providers: [OtpService, EmailService],
  exports: [OtpService],
})
export class OtpModule {}

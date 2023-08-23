import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { EmailService } from 'src/providers/email.service';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {

  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    private emailService: EmailService,
    ) {}

  create(createOtpDto: CreateOtpDto) {
    return 'This action adds a new otp';
  }

  findAll() {
    return `This action returns all otp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }

  generateRandomOtp() {
    let otp = "";
    for (let i=0; i<6; i++){
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }
  
  async sendOtp(email: string) {
    let otp = await this.generateRandomOtp();
    await this.emailService.sendEmail(email, "FlirtFever Confirmation Code", "Your FlirtFever Confirmation Code is: " + otp);
    return otp;
  }

  async saveOtp(user: User, pin: string): Promise<Otp | undefined> {
    const otp = new Otp();
    otp.user = user.id
    otp.pin = pin
    return await this.otpRepository.save(otp);
  }

  async verifyOtp(user_id: number, pin: string): Promise<any> {
    const otp = await this.findByUserId(user_id);
    if (otp.pin === pin) {
      return true
    }
    return false
  }

  async findByUserId(user: number): Promise<Otp | undefined> {
    return await this.otpRepository.findOne({ where: { user }})
  }
}

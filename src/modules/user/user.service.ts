import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email }})
  }

  async saveUser(user: User): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id }})
  }

  async updateVerify(verify: boolean, id: number): Promise<User | undefined> {
    let user = await this.findById(id)
    user.verify = verify
    return await this.saveUser(user);
  }
}
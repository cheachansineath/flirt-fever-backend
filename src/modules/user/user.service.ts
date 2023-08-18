import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateUser(user: User): Promise<User | undefined> {
    if (user != null) {
      return user;
    }
    throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'User not found' })
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'email', 'verify', 'age', 'gender', 'height', 'weight', 'location', 'bio', 'profile_url']
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return this.validateUser(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email }});
    return this.validateUser(user);
  }

  async saveUser(user: User): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id }});
    return this.validateUser(user);
  }

  async updateVerify(verify: boolean, id: number): Promise<User | undefined> {
    let user = await this.findById(id)
    user.verify = verify
    return await this.saveUser(user);
  }

  async updateUser(filename: string, userId: number, gender: string, height: number, weight: number, age: number, location: string, bio: string): Promise<User | BadRequestException> {
    let user = await this.findById(userId);
    if (user.verify != true) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'User has not been verified yet' })
    }

    user.gender = gender;
    user.height = height;
    user.weight = weight;
    user.age = age;
    user.location = location;
    user.profile_url = process.env.FILE_URL + filename
    user.bio = bio;
    return user;
  }

  async validateImage(filename: string) {
    if (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return true
    return false
  }
}
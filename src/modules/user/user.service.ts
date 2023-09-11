import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(user: User): Promise<User | undefined> {
    if (user != null) {
      return user;
    }
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'User not found',
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: [
        'id',
        'username',
        'email',
        'verify',
        'age',
        'gender',
        'height',
        'weight',
        'location',
        'bio',
        'profile_url',
      ],
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    username = username.toLowerCase();
    const user = await this.userRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'email',
        'verify',
        'age',
        'gender',
        'height',
        'weight',
        'location',
        'bio',
        'profile_url',
        'interest',
        'page',
        'preference',
      ],
    });
    // return this.validateUser(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'username',
        'email',
        'verify',
        'age',
        'gender',
        'height',
        'weight',
        'location',
        'bio',
        'profile_url',
        'password',
      ],
    });
    // return this.validateUser(user);
    return user;
  }

  async saveUser(user: User): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'email',
        'verify',
        'age',
        'gender',
        'height',
        'weight',
        'location',
        'bio',
        'profile_url',
        'interest',
        'page',
        'preference',
      ],
    });
    return this.validateUser(user);
  }

  async updateVerify(verify: boolean, id: number): Promise<User | undefined> {
    let user = await this.findById(id);
    user.verify = verify;
    return await this.saveUser(user);
  }

  async updateUser(
    userId: number,
    gender: string,
    height: number,
    weight: number,
    age: number,
    location: string,
    bio: string,
    preference: string,
    interest: string[],
  ): Promise<User | BadRequestException> {
    let user = await this.findById(userId);
    if (user.verify != true) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'User has not been verified yet',
      });
    }

    user.gender = gender;
    user.height = height;
    user.weight = weight;
    user.age = age;
    user.location = location;
    user.bio = bio;
    if (preference) {
      user.preference = preference;
    } else {
      if (!user.preference) {
        if (user.gender == 'male') {
          user.preference = 'female';
        } else {
          user.preference = 'male';
        }
      }
    }
    if (interest != null) {
      user.interest = interest;
    }

    if (bio != '') {
      user.bio = bio;
    }
    return await this.saveUser(user);
  }

  async softDeleteUser(user: User): Promise<any> {
    user.deletedAt = new Date();
    await this.saveUser(user);
    return {
      status: 1,
      message: 'Successfully delete!!!',
    };
  }

  async validateImage(userId: number, filename: string) {
    if (
      filename.endsWith('.png') ||
      filename.endsWith('.jpg') ||
      filename.endsWith('.jpeg')
    ) {
      const user = await this.findById(userId);
      user.profile_url = process.env.FILE_URL + filename;
      await this.saveUser(user);
      return user.profile_url;
    }
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'File must be a png, jpg or jpeg',
    });
  }

  async getLastRow(): Promise<number | null> {
    const lastRow = await this.userRepository.findOne({
      order: { id: 'DESC' },
    });
    return lastRow.id || null;
  }

  async findVerify(userId: number): Promise<any> {
    const currentUser = await this.findById(userId);
    if (currentUser != null) {
      const lastRow = await this.getLastRow();
      // console.log(currentUser.page);
      let result: User;
      while (currentUser.page <= lastRow) {
        if (currentUser.page == currentUser.id) {
          currentUser.page++;
        }
        if (currentUser.preference == 'any') {
          result = await this.userRepository.findOne({
            where: {
              verify: true,
              id: currentUser.page,
              deletedAt: null,
            },
            select: [
              'id',
              'username',
              'email',
              'interest',
              'age',
              'gender',
              'height',
              'weight',
              'location',
              'bio',
              'profile_url',
            ],
          });
        } else {
          result = await this.userRepository.findOne({
            where: {
              verify: true,
              id: currentUser.page,
              deletedAt: null,
              preference: currentUser.preference,
            },
            select: [
              'id',
              'username',
              'email',
              'interest',
              'age',
              'gender',
              'height',
              'weight',
              'location',
              'bio',
              'profile_url',
            ],
          });
        }
        if (result != null) {
          currentUser.page++;
          await this.saveUser(currentUser);
          return {
            data: result,
            status: 1,
          };
        }
        currentUser.page++;
      }

      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Cannot find another User right now!!!',
      });
    }
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'User not found',
    });
  }

  public getOne(id: number): Promise<any> {
    return this.userRepository.findOneOrFail({ id });
  }

  async dataForApi(user: User): Promise<any> {
    const response = {
      id: user.id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      age: user.age,
      location: user.location,
      profile_url: user.profile_url,
      interest: user.interest,
      bio: user.bio,
      preference: user.preference,
    };

    return response;
  }
}

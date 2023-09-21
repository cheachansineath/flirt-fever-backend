import { Controller, Get, Param, Body, Post, Req, UseInterceptors, Res, UploadedFile, BadRequestException, Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/auth.guard';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { saveImageToStorage } from './image-validate';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Delete('username/:username')
  async softDeleteUser(@Param('username') username: string) {
    return await this.userService.softDeleteUser(await this.userService.findByUsername(username));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async uploadProfile(@UploadedFile() file, @Req() request) {
    if (!file) throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'User profile needed' });
    const fileName = file?.filename;
    return {
      profileUrl: await this.userService.validateImage(request.user.sub, fileName),
      status: 1
    }
  }

  @Post()
  async updateUser(@Req() request, @Body() {gender, height, weight, age, location, bio = "", preference = null, interest = null, dob}: UserUpdateDto) {
    const user = request.user;
    const userId = user.sub;
    return this.userService.updateUser(userId, gender, height, weight, age, location, bio, preference, interest, dob);
  }

  @Public()
  @Get('files/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
      const imagePath = path.join(__dirname, `${process.env.FILE_PATH}/${imageName}`)
      if (!fs.existsSync(imagePath)) {
        throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'File not found' });
      }
      const fileStream = fs.createReadStream(imagePath);
      fileStream.pipe(res);
  }

  @Get('/username/:username')
  async getUserByUsername(@Param('username') username: string) {
    const user = this.userService.findByUsername(username);
    if (user === null) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'User not found' });
    }
    return user;
  }

  @Get('verify')
  async getAllVerifiedUsers(@Req() request) {
    return await this.userService.findVerify(request.user.sub);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}

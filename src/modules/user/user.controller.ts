import { Controller, Get, Param, Body, Post, Req, UseInterceptors, Res, UploadedFile, BadRequestException } from '@nestjs/common';
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
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async updateUser(@UploadedFile() file, @Req() request, @Body() {gender, height, weight, age, location, bio}: UserUpdateDto) {
    const user = request.user;
    const userId = user.sub;
    if (!file) throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'User profile needed' });

    const fileName = file?.filename
    const imageValidate = await this.userService.validateImage(fileName)
    if (!imageValidate) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'File must be a png, jpg or jpeg' });
    }
    return this.userService.updateUser(fileName, userId, gender, height, weight, age, location, bio);
  }

  @Public()
  @Get('files/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = path.join(__dirname, `../../../../../uploads/${imageName}`)
    const fileStream = fs.createReadStream(imagePath);
    fileStream.pipe(res);
  }
}

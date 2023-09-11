import { Body, Controller, Inject, Post } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { createMessageDto } from './dto/createMessage.dto';
import { IMessage } from './message.interface';

@Controller('message')
export class MessageController {
  constructor(
    @Inject('MessageService') private readonly messageService: IMessage,
  ) {}

  @Post()
  createMessage(@Body() createMessageDto: createMessageDto) {
    return this.messageService.createMessage({ ...createMessageDto });
  }
}

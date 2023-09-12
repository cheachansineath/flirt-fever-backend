import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { createMessageDto } from './dto/createMessage.dto';
import { IMessage } from './message.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('message')
export class MessageController {
  constructor(
    @Inject('MessageService') private readonly messageService: IMessage,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createMessage(@Body() createMessageDto: createMessageDto) {
    const msg = await this.messageService.createMessage({
      ...createMessageDto,
    });
    this.eventEmitter.emit('message.created', msg);
    return;
  }

  @Get(':matchingId')
  getMessagesFromConversation(@Param('matchingId') matchingId: number) {
    return this.messageService.getMessagesByMatchingId(matchingId);
  }
}

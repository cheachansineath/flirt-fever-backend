import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Param,
} from '@nestjs/common';
import { IMessage } from './message.interface';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matching } from '../matching/entities/matching.entity';
import { createMessageParams } from './type';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService implements IMessage {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Matching)
    private readonly matchingRepository: Repository<Matching>,

    private userService: UserService,
  ) {}

  async createMessage({
    username,
    content,
    conversationId,
  }: createMessageParams): Promise<Message> {
    // console.log(user);
    const user = await this.userService.findByUsername(username);
    const matching = await this.matchingRepository.findOne({
      where: { id: conversationId },
      select: ['id', 'fromUser', 'toUser', 'requestedat', 'accept'],
      relations: ['fromUser', 'toUser'],
    });
    // console.log(matching);

    if (!matching) {
      throw new HttpException('Matching not found', HttpStatus.BAD_REQUEST);
    }

    const { toUser, fromUser } = matching;
    console.log(toUser.id, user.id, fromUser.id);
    if (toUser.id !== user.id && fromUser.id !== user.id) {
      throw new HttpException('Cannot Create Message', HttpStatus.FORBIDDEN);
    }

    const newMessage = this.messageRepository.create({
      content,
      matching,
      author: user,
    });

    const savedMessage = await this.messageRepository.save(newMessage);
    matching.lastMessageSent = savedMessage;
    // matching.lastMessageSent = savedMessage;
    await this.matchingRepository.save(matching);
    return savedMessage;
  }

  getMessagesByMatchingId(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { matching: { id: conversationId } },
      order: {
        createAt: 'DESC',
      },
      relations: ['author'],
    });
  }
}

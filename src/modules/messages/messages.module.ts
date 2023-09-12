import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Matching } from '../matching/entities/matching.entity';
import { Message } from './entities/message.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Matching, User]), UserModule],
  controllers: [MessageController],
  providers: [
    {
      provide: 'MessageService',
      useClass: MessageService,
    },
  ],
})
export class MessagesModule {}

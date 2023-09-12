import { Message } from './entities/message.entity';
import { createMessageParams } from './type';

export interface IMessage {
  createMessage(params: createMessageParams): Promise<Message>;
  getMessagesByMatchingId(conversationId: number): Promise<Message[]>;
}

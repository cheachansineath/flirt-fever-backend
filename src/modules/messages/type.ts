import { User } from '../user/entities/user.entity';

export type createMessageParams = {
  content: string;
  conversationId: number;
  username: string;
};

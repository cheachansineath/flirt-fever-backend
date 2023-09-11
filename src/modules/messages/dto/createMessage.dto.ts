import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createMessageDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  conversationId: number;
}

import { Message } from 'src/modules/messages/entities/message.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'matching' })
export class Matching {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn()
  fromUser: User;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn()
  toUser: User;

  @Column({ default: false })
  accept: boolean;

  @Column({ type: 'timestamp', name: 'deletedAt', nullable: true })
  deletedAt: Date;

  @Column({ type: 'timestamp', name: 'requestedat' })
  requestedat: Date;

  @OneToMany(() => Message, (message) => message.matching, {
    cascade: ['insert', 'remove', 'update'],
  })
  messages: Message[];

  @Column({ name: 'created_at', nullable: true })
  createdAt: number;

  @OneToOne(() => Message)
  @JoinColumn({ name: 'last_message_sent' })
  lastMessageSent: Message;
}

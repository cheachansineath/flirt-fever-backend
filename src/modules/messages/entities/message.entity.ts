import { Matching } from 'src/modules/matching/entities/matching.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ name: 'create_at', nullable: true })
  createAt: number;

  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @ManyToOne(() => Matching, (matching) => matching.messages)
  matching: Matching;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { Message } from 'src/modules/messages/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  verify: boolean | null;

  @Column({ nullable: true })
  gender: string | null;

  @Column('float', { nullable: true })
  height: number | null;

  @Column('float', { nullable: true })
  weight: number | null;

  @Column({ nullable: true })
  age: number | null;

  @Column({ nullable: true })
  location: string | null;

  @Column({ nullable: true })
  profile_url: string | null;

  @Column({ length: 100, nullable: true })
  bio: string | null;

  @Column('simple-array', { nullable: true, default: [] })
  interest: string[];

  @Column('integer', { default: 1 })
  page: number;

  @Column({ nullable: true })
  preference: string;

  @Column({ type: 'timestamp', name: 'deletedAt', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Message, (message) => message.author)
  @JoinColumn()
  messages: Message[];
}

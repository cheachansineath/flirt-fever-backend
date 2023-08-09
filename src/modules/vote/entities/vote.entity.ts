import { Post } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id, {cascade: true})
  @JoinColumn()
  user: User;

  @ManyToOne(() => Post, post => post.id, {cascade: true})
  @JoinColumn()
  post: Post;

  @Column()
  value: boolean;
}

import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => User, user => user.id, {cascade: true})
  @JoinColumn()
  user: User;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  location: string;

  @Column()
  datePost: Date;
}

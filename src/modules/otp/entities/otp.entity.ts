import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pin: string;

  @ManyToOne(() => User, user => user.id, {cascade: true})
  @JoinColumn()
  user: User;
}

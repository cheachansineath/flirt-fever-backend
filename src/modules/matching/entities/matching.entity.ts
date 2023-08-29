import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Matching {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id, {cascade: true})
  @JoinColumn()
  fromUser: User;

  @ManyToOne(() => User, user => user.id, {cascade: true})
  @JoinColumn()
  toUser: User;

  @Column({ default: false })
  accept: boolean;

  @Column({ type: 'timestamp', name: 'deletedAt', nullable: true})
  deletedAt: Date;

  @Column({ type: 'timestamp', name: 'requestedAt' })
  requestedAt: Date;
}

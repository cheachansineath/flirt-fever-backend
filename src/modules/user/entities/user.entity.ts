import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('integer', { nullable: true, array: true, default: [] })
  connect: number[];
  
}
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

  @Column()
  verify: boolean;

  @Column()
  gender: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  age: number;

  @Column()
  location: string;

  @Column()
  profile_url: string;

  @Column({ length: 100 })
  bio: string;
  
}
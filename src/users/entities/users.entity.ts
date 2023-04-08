import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  location_id: number;

  @Column()
  password: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}

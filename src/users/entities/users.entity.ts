import dayjs = require('dayjs');
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 256 })
  name: string;

  @Column({ type: 'varchar', width: 256 })
  email: string;

  @Column()
  nickname: string;

  @Column('int')
  location_id: number;

  @Column({ type: 'varchar', width: 256 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    this.updated_at = new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }
}

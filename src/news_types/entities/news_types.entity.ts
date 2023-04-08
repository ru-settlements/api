import dayjs = require('dayjs');
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('news_types')
export class NewsTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 256 })
  name: string;

  @Column({ type: 'varchar', width: 256 })
  description: string;

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

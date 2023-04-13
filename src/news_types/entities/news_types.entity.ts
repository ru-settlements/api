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

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    // todo rewrite it or move to helper
    this.created_at = new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    this.updated_at = new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }

  @BeforeUpdate()
  insertUpdated() {
    // todo rewrite it or move to helper
    this.updated_at = new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }
}

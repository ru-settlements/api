import dayjs = require('dayjs');
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { NewsTypes } from '../../news_types/entities/news_types.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 256 })
  title: string;

  @Column('text')
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  type_id: number;

  @OneToOne(() => NewsTypes)
  @JoinColumn({ name: 'type_id' })
  type: NewsTypes;

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

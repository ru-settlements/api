import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 256 })
  title: string;

  @Column('text')
  text: string;

  @Column('timestamp')
  created_at: string;

  @Column('timestamp')
  updated_at: string;

  @Column('int')
  type_id: number;
}

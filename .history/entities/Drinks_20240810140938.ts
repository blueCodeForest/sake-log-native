import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConstructableBaseEntity } from './ConstructableBaseEntity';

@Entity()
export class Drinks extends ConstructableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column('float')
  alcoholDegree: number;

  @Column()
  sizeId: number;

  @Column({ nullable: true })
  memo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DrinkSizes } from './DrinkSizes';
import { DrinkingLogs } from './DrinkingLogs';

@Entity()
export class Drinks {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  name!: string;

  @Column('int')
  alcoholDegree!: number;

  @Column('int')
  sizeId!: number;

  @ManyToOne(() => DrinkSizes, (size) => size.drinks)
  @JoinColumn({ name: 'sizeId' })
  size!: DrinkSizes;

  @Column({ nullable: true })
  memo?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => DrinkingLogs, (drinkingLog) => drinkingLog.drink)
  drinkingLogs!: DrinkingLogs[];
}

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
import { DrinkSize } from './DrinkSize';
import { DrinkingLog } from './DrinkingLog';

@Entity('drinks')
export class Drink {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  name!: string;

  @Column('int')
  alcoholDegree!: number;

  // @Column('int')
  // sizeId!: number;
  @ManyToOne(() => DrinkSize, (size) => size.drinks)
  @JoinColumn({ name: 'sizeId' })
  size!: DrinkSize;

  @Column('text', { nullable: true })
  memo?: string;

  @Column('boolean', { default: true })
  isVisible!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => DrinkingLog, (drinkingLog) => drinkingLog.drink)
  drinkingLogs?: DrinkingLog[];
}

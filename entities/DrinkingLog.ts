import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Drink } from './Drink';

@Entity('drinking_logs')
export class DrinkingLog {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  // @Column('int')
  // drinkId!: number;
  @ManyToOne(() => Drink, (drink) => drink.drinkingLogs)
  @JoinColumn({ name: 'drinkId' })
  drink!: Drink;

  @CreateDateColumn()
  createdAt!: Date;
}

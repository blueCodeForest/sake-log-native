import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Drinks } from './Drinks';

@Entity()
export class DrinkingLogs {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  drinkId!: number;

  @ManyToOne(() => Drinks, (drink) => drink.drinkingLogs)
  @JoinColumn({ name: 'drinkId' })
  drink!: Drinks;

  @CreateDateColumn()
  createdAt!: Date;
}

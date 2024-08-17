import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Drink } from './Drink';

@Entity('drink_sizes')
export class DrinkSize {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  name!: string;

  @Column('int')
  amount!: number;

  @OneToMany(() => Drink, (drink) => drink.size)
  drinks?: Drink[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Drinks } from './Drinks';

@Entity()
export class DrinkSizes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('int')
  amount!: number;

  @OneToMany(() => Drinks, (drink) => drink.size)
  drinks!: Drinks[];
}

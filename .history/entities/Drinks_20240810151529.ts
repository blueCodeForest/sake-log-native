import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DrinkSizes } from './DrinkSizes';

@Entity()
export class Drinks {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('int')
  alcoholDegree!: number;

  @Column()
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
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Type } from './type.entity';

@Entity()
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Type)
  type: Type;

  @Column()
  joke: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;
}
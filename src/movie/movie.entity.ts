import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity( { name: "movies"} )
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  studio: string;

  @Column()
  year: number;
}
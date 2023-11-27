import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity( { name: "movies"} )
export class Movie {
  @ApiProperty({ description: 'Movie ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Movie name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Studio name' })
  @Column()
  studio: string;

  @ApiProperty({ description: 'Film release year' })
  @Column()
  year: number;
}
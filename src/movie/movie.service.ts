import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async createMovie(name: string, studio: string, year: number): Promise<Movie> {
    const movie = this.movieRepository.create({ name, studio, year } as DeepPartial<Movie>);
    return this.movieRepository.save(movie);
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }
}

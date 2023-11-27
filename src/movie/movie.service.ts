import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './movie.dto';
import { EmptyFieldException } from './exceptions/exceptions.post';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { name, studio, year } = createMovieDto;
    if (!name || !studio || !year) throw new EmptyFieldException('name, studio or year');

    const movie = this.movieRepository.create({ name, studio, year });
    return await this.movieRepository.save(movie);
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }
}

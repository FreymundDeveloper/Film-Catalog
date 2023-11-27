import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto, ReadMovieDto } from './movie.dto';
import { EmptyFieldException } from './exceptions/exceptions.post';
import { EmptySearchException, NoMoviesFoundException } from './exceptions/exceptions.get';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}
  
  //POST
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { name, studio, year } = createMovieDto;
    if (!name || !studio || !year) throw new EmptyFieldException('name, studio or year');

    const movie = this.movieRepository.create({ name, studio, year });
    return await this.movieRepository.save(movie);
  }

  //GET
  async readMovies(readMovieDto: ReadMovieDto): Promise<Movie[]> {
    const { name } = readMovieDto;
    
    if (!name) throw new EmptySearchException();
    const movies = await this.movieRepository.find({ where: { name: ILike(`%${name}%`) } });
    if (movies.length === 0) throw new NoMoviesFoundException()

    return movies;
  }
}

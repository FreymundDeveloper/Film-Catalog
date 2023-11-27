import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto, ReadMovieDto, UpdateMovieDto } from './movie.dto';
import { EmptyFieldException } from './exceptions/exceptions.post';
import { EmptySearchException, NoMoviesFoundException } from './exceptions/exceptions.get';
import { EmptyUpdateFieldsException, MovieNotFoundException } from './exceptions/exceptions.put';

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

  //PUT
  async updateMovie(name: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { name } });

    if (!movie) throw new MovieNotFoundException();

    if (updateMovieDto.name !== undefined) {
      movie.name = updateMovieDto.name;
    }
    if (updateMovieDto.studio !== undefined) {
      movie.studio = updateMovieDto.studio;
    }
    if (updateMovieDto.year !== undefined) {
      movie.year = typeof updateMovieDto.year === 'string' ? parseInt(updateMovieDto.year, 10) : updateMovieDto.year;
    }

    try {
      return await this.movieRepository.save(movie);
    } catch (error) {
      throw new EmptyUpdateFieldsException();
    }
  }
}

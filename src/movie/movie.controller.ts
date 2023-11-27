import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MovieService } from './movie.service';
import { CreateMovieDto, DeleteMovieDto, ReadMovieDto, UpdateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';
import { EmptyUpdateFieldsException } from './exceptions/exceptions.put';
import { EmptyNameException, MovieDeleteNotFoundException } from './exceptions/exceptions.delete';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMovieDto: CreateMovieDto): Promise<any> {
    const movie = await this.movieService.create(createMovieDto);
    return { message: 'Movie created successfully', movie };
  }

  @Get('read')
  @UseGuards(JwtAuthGuard)
  async readMovies(@Query() readMovieDto: ReadMovieDto) {
    return this.movieService.readMovies(readMovieDto);
  }

  @Put('update/:name')
  @UseGuards(JwtAuthGuard)
  async updateMovie(
    @Param('name') name: string,
    @Body(new ValidationPipe()) updateMovieDto: UpdateMovieDto,

  ): Promise<Movie> {
    if (Object.values(updateMovieDto).some(value => value === '')) throw new EmptyUpdateFieldsException();

    return this.movieService.updateMovie(name, updateMovieDto);
  }

  @Delete('delete/:name')
  async deleteMovie(@Param() params: DeleteMovieDto): Promise<void> {
    try {
      await this.movieService.deleteMovie(params);
    } catch (error) {
      if (error instanceof MovieDeleteNotFoundException || error instanceof EmptyNameException) {
        throw error;
      }
      throw new Error('Unhandled exception');
    }
  }
}
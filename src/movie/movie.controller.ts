import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MovieService } from './movie.service';
import { CreateMovieDto, ReadMovieDto } from './movie.dto';

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
}
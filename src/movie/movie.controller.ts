import { Controller, Get } from '@nestjs/common';

@Controller('movies')
export class MovieController {
  @Get()
  getAllMovies() {
    return 'Get all movies';
  }
}
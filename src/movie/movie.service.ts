import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  getAllMovies() {
    return 'Get all movies from service';
  }
}
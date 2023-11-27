import { BadRequestException, NotFoundException } from '@nestjs/common';

export class EmptySearchException extends BadRequestException {
  constructor() {
    super('The search field cannot be empty.');
  }
}

export class NoMoviesFoundException extends NotFoundException {
  constructor() {
    super('No movies found for the search provided.');
  }
}
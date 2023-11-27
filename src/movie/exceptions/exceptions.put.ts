import { BadRequestException, NotFoundException } from '@nestjs/common';

export class EmptyUpdateFieldsException extends BadRequestException {
  constructor() {
    super('No fields can be updated to empty.');
  }
}

export class MovieNotFoundException extends NotFoundException {
  constructor() {
    super('Film not found.');
  }
}
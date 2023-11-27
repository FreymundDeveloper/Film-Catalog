import { NotFoundException } from '@nestjs/common';

export class MovieDeleteNotFoundException extends NotFoundException {
  constructor() {
    super('Movie not found');
  }
}

import { BadRequestException } from '@nestjs/common';

export class EmptyNameException extends BadRequestException {
  constructor() {
    super('Name cannot be empty');
  }
}
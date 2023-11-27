import { BadRequestException } from '@nestjs/common';

export class EmptyFieldException extends BadRequestException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' cannot be empty`);
  }
}
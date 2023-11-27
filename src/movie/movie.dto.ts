import { IsNotEmpty, IsString } from "class-validator";

export class CreateMovieDto {
    name: string;
    studio: string;
    year: number;
  }

export class ReadMovieDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  }
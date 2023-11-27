import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

export class UpdateMovieDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    studio?: string;
  
    @IsOptional()
    year?: number;
}

export class DeleteMovieDto {
    @IsNotEmpty()
    readonly name: string;
}
  
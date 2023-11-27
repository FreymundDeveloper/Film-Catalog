import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
    @ApiProperty({ description: 'Movie name' })
    name: string;

    @ApiProperty({ description: 'Studio name' })
    studio: string;

    @ApiProperty({ description: 'Film release year' })
    year: number;
}

export class ReadMovieDto {
    @ApiProperty({ description: 'Movie name' })
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateMovieDto {
    @ApiProperty({ description: 'Movie name' })
    @IsString()
    @IsOptional()
    name?: string;
    
    @ApiProperty({ description: 'Studio name' })
    @IsString()
    @IsOptional()
    studio?: string;
  
    @ApiProperty({ description: 'Film release year' })
    @IsOptional()
    year?: number;
}

export class DeleteMovieDto {
    @ApiProperty({ description: 'Movie name' })
    @IsNotEmpty()
    readonly name: string;
}
  
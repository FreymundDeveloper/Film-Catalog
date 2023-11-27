import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MovieService } from './movie.service';
import { CreateMovieDto, DeleteMovieDto, ReadMovieDto, UpdateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';
import { EmptyUpdateFieldsException } from './exceptions/exceptions.put';
import { EmptyNameException, MovieDeleteNotFoundException } from './exceptions/exceptions.delete';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('create')

  //Swagger
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a movie' })
  @ApiResponse({
    status: 201,
    description: 'Movie created successfully',
    schema: {
      properties: {
        name: { type: 'string', description: 'Movie name' },
        studio: { type: 'string', description: 'Studio name' },
        year: { type: 'number', description: 'Film release year' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'The field name, studio or year cannot be empty' })
  @ApiResponse({ status: 401, description: 'Invalid token' })

  //POST Logic
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMovieDto: CreateMovieDto): Promise<any> {
    const movie = await this.movieService.create(createMovieDto);
    return { message: 'Movie created successfully', movie };
  }

  @Get('read')

  //Swagger
  @ApiOperation({ summary: 'Search a movie' })
  @ApiResponse({
    status: 200,
    description: 'Film found successfully',
    schema: {
      properties: {
        name: { type: 'string', description: 'Movie name' },
        studio: { type: 'string', description: 'Studio name' },
        year: { type: 'number', description: 'Film release year' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'The search field cannot be empty' })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'No movies found for the search provided' })

  //GET Logic
  @UseGuards(JwtAuthGuard)
  async readMovies(@Query() readMovieDto: ReadMovieDto) {
    return this.movieService.readMovies(readMovieDto);
  }

  @Put('update/:name')

  //Swagger
  @ApiOperation({ summary: 'Update a movie' })
  @ApiResponse({
    status: 200,
    description: 'Film updated successfully',
    schema: {
      properties: {
        name: { type: 'string', description: 'Movie name' },
        studio: { type: 'string', description: 'Studio name' },
        year: { type: 'number', description: 'Film release year' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'No fields can be updated to empty' })
  @ApiResponse({ status: 404, description: 'Film not found.' })
  @ApiResponse({ status: 401, description: 'Invalid token' })

  //PUT Logic
  @UseGuards(JwtAuthGuard)
  async updateMovie(
    @Param('name') name: string,
    @Body(new ValidationPipe()) updateMovieDto: UpdateMovieDto,

  ): Promise<Movie> {
    if (Object.values(updateMovieDto).some(value => value === '')) throw new EmptyUpdateFieldsException();

    return this.movieService.updateMovie(name, updateMovieDto);
  }

  @Delete('delete/:name')

  //Swagger
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({ status: 200, description: 'Film deleted.' })
  @ApiResponse({ status: 404, description: 'Film not found.' })
  @ApiResponse({ status: 401, description: 'Invalid token' })

  //DELETE Logic
  async deleteMovie(@Param() params: DeleteMovieDto): Promise<void> {
    try {
      await this.movieService.deleteMovie(params);
    } catch (error) {
      if (error instanceof MovieDeleteNotFoundException || error instanceof EmptyNameException) {
        throw error;
      }
      throw new Error('Unhandled exception');
    }
  }
}
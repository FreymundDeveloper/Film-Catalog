import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis/redis.module';
import { MovieModule } from './movie/movie.module';
import { setupSwagger } from './swagger';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      load: [__dirname + '/**/*.entity{.ts,.js}'],
      ...require('../ormconfig.postgres.json'),
    }),
    RedisModule,
    MovieModule,
  ],
})

export class AppModule {
  constructor() {
    setupSwagger(this);
  }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis/redis.module';
import { MovieModule } from './movie/movie.module';
import { setupSwagger } from './swagger';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

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
  constructor() {}

  async onApplicationBootstrap() {
    const app = await NestFactory.create(AppModule);
    await this.setupSwagger(app);
  }

  private async setupSwagger(app: INestApplication) {
    setupSwagger(app);
  }
}
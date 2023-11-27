import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis/redis.module';
import { MovieModule } from './movie/movie.module';
import { setupSwagger } from './swagger';
import { INestApplication } from '@nestjs/common';
import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      load: [__dirname + '/**/*.entity{.ts,.js}'],
      ...require('../ormconfig.postgres.json'),
    }),
    AuthModule,
    RedisModule,
    MovieModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
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
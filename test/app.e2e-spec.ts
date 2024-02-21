import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MovieService } from '../src/movie/movie.service';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

describe('Movie App Tests (e2e)', () => {
  let app;
  let service: MovieService;
  let module: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    module = await NestFactory.create(AppModule);
    service = module.get(MovieService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Testing token generate', async () => {
    await request(app.getHttpServer())
      .get('/auth/login')
      .expect(200);
  });

  it('Test Service integrity', async () => {
    expect(service).toBeDefined();
  });
  
  afterAll(async () => {
    await app.close();
  });
});

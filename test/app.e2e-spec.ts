import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

// run: npm test -- -c test/jest-e2e.json --detectOpenHandles
describe('MovieController (e2e)', () => {
  let app;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Testing token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/login')
      .expect(200);

    authToken = `Bearer ${response.body.token}`;
  });
  
  afterAll(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
	email: 'mironuk@gmail.com',
	password: '123456789',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();
  });
  it('/auth/login (POST) - success', async () => {
	return supertest(app.getHttpServer())
		.post('/auth/login')
		.send(loginDto)
		.expect(200)
		.then(({ body }: supertest.Response) => {
			expect(body.accessToken).toBeDefined();
		});
  	});
  it('/auth/login (POST) - fail email', () => {
	return supertest(app.getHttpServer())
		.post('/auth/login')
		.send({...loginDto, email: 'mironuk1@gmail.com'})
		.expect(401, {
            statusCode: 401,
            message: 'User not found',
            error: 'Unauthorized'
        });
	});
    it('/auth/login (POST) - fail password', () => {
        return supertest(app.getHttpServer())
            .post('/auth/login')
            .send({...loginDto, password: '123'})
            .expect(401, {
                statusCode: 401,
                message: 'Wrong Password',
                error: 'Unauthorized'
            });
        });
	afterAll(() => {
		disconnect();
	});
});

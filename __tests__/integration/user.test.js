import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import User from '../../src/app/models/User';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async() => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Diego Fernandes',
      email: 'fernandes@gmail.com',
      password: '8712381623',
    });

    const compareHash = await bcrypt.compare('8712381623', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'fernandes@gmail.com',
        password: '8712381623',
      });

    expect(response.body).toHaveProperty('id');
  });

  it(`shouldn't be able to register with duplicated email`, async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'fernandes@gmail.com',
        password: '8712381623',
    });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'fernandes@gmail.com',
        password: '8712381623',
      });

    expect(response.status).toBe(400);
  });
});

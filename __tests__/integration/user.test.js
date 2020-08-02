import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'fernandes@gmail.com',
        password_hash: '8712381623',
      });

    expect(response.body).toHaveProperty('id');
  });

  if(`shouldn't be able to register with duplicated email`, async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'fernandes@gmail.com',
        password_hash: '8712381623',
    });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'fernandes@gmail.com',
        password_hash: '8712381623',
      });

    expect(response.status).toBe(400);
  });
});

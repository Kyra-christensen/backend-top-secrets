const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('top-secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a user', async () => {
    const newUser = { email: 'kyra@email.com', password: 'totallysecretpassword' };

    const res  = await request(app)
      .post('/api/v1/users')
      .send(newUser);

    expect(res.body).toEqual({ id: expect.any(String), email: 'kyra@email.com' });
  });

  it('signs in a user', async () => {
    const user = await UserService.create({
      email: 'kyra@email.com',
      password: 'totallysecretpassword',
    });

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({
        email: 'kyra@email.com',
        password: 'totallysecretpassword',
      });

    expect(res.body).toEqual({
      message: 'Successfully signed in!',
      user,
    });
  });
  
});

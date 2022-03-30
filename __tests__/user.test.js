const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('top-secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a user', async () => {
    const newUser = { email: 'kyra@email.com', password: 'secretpassword' };

    const res  = await request(app)
      .post('/api/v1/users')
      .send(newUser);

    expect(res.body).toEqual({ id: expect.any(String), email: 'kyra@email.com' });
  });

  
});

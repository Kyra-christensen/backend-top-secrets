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

  it('should return an error if secrets are accessed without a logged in user', async () => {
    const res = await request(app)
      .get('/api/v1/secrets');
    expect(res.body).toEqual({
      status: 401,
      message: 'Log in to access these secrets.'
    });
  });

  
});

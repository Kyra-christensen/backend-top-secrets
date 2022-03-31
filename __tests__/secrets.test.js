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
    const agent = request.agent(app);

    await UserService.signUp({
      email: 'kyra@defense.gov',
      password: 'secretpassword',
    });
    
    const res = await agent.post('/api/v1/secrets').send({
      title: 'Top Secret',
      description: 'redacted',
      userId: expect.any(String),
    });

    expect(res.body).toEqual({
      message: 'You must be signed in',
      status: 401,
    });
  });
});

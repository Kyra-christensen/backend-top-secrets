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

  it('creates a user', async () => {
    const res  = await request(app)
      .post('/api/v1/users')
      .send({ email: 'kyra@email.com', password: 'totallysecretpassword',
      });

    expect(res.body).toEqual({ 
      id: expect.any(String), 
      email: 'kyra@email.com', 
    });
  });

  it('signs in a user', async () => {
    const user = await UserService.signUp({
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

  it('should sign out a user', async () => {
    let user = await UserService.signUp({
      email: 'kyra@email.com',
      password: 'totallysecretpassword',
    });

    user = await UserService.signIn({
      email: 'kyra@email.com',
      password: 'totallysecretpassword',
    });

    const res = await request(app)
      .delete('/api/v1/users/sessions')
      .send(user);

    expect(res.body).toEqual({
      message: 'Successfully signed out!'
    });
  });
});

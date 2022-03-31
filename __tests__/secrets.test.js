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

  it('should not allow unauthenticated user to create an secret', async () => {
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

  it('allows logged in users to create new secrets', async () => {
    const user = {
      email: 'kyra@email.com',
      password: 'totallysecretpassword'
    };

    const expected = {
      id: expect.any(String),
      title: 'new secret',
      description: 'cats are amazing',
      createdAt: expect.any(String)
    };

    await UserService.signIn(user);

    const agent = request.agent(app);

    let res = await agent
      .get('/api/v1/secrets');
    
    expect(res.body).toEqual({ 
      message: 'You must be signed in', status: 401 
    });

    await agent
      .post('/api/v1/users/sessions')
      .send(user);

    res = await agent
      .post('/api/v1/secrets')
      .send(expected);

    expect(res.body).toEqual(expected);
  });

  it('allows logged in users to view secrets', async () => {
    const user = {
      email: 'kyra@email.com',
      password: 'totallysecretpassword'
    };

    await UserService.signIn(user);

    const agent = request.agent(app);

    let res = await agent
      .get('/api/v1/secrets');
    
    expect(res.body).toEqual({ 
      message: 'You must be signed in', status: 401 
    });

    await agent
      .post('/api/v1/users/sessions')
      .send(user);

    res = await agent
      .get('/api/v1/secrets');

    const expected = [{
      id: expect.any(String),
      title: 'big secret',
      description: 'earth is round',
      createdAt: expect.any(String)
    }];

    expect(res.body).toEqual(expected);
  });
});

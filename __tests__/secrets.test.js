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

  it('allows logged in users to create new secrets', async () => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/users')
      .send({ email: 'kyra@defense.gov', password: 'secretpassword' });

    const userres = await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'kyra@defense.gov', password: 'secretpassword' });
    console.log(userres);
    const newSecret = { description: 'Fridays are the best days', title: 'a new secret' };

    const res = await agent
      .post('/api/v1/secrets')
      .send(newSecret);

    expect(res.body).toEqual({ createdAt: expect.any(String), ...newSecret, id: expect.any(String) });
  });

  // it.skip('allows logged in users to view secrets', async () => {
  //   const user = {
  //     email: 'kyra@email.com',
  //     password: 'totallysecretpassword'
  //   };

  //   await UserService.signIn(user);

  //   const agent = request.agent(app);

  //   let res = await agent
  //     .get('/api/v1/secrets');
    
  //   expect(res.body).toEqual({ 
  //     message: 'You must be signed in', status: 401 
  //   });

  //   await agent
  //     .post('/api/v1/users/sessions')
  //     .send(user);

  //   res = await agent
  //     .get('/api/v1/secrets');

  //   const expected = [{
  //     id: expect.any(String),
  //     title: 'big secret',
  //     description: 'earth is round',
  //     createdAt: expect.any(String)
  //   }];

  //   expect(res.body).toEqual(expected);
  // });
});

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

  it('allows logged in users to view secrets', async () => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/users')
      .send({ email: 'kyra@defense.gov', password: 'secretpassword' });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'kyra@defense.gov', password: 'secretpassword' });

    const res = await agent
      .get('/api/v1/secrets');

    expect(res.body).toEqual([{ createdAt: expect.any(String), description: 'Kyras cats are cute!', title: 'Top Secret', id: expect.any(String) }]);
  });
});

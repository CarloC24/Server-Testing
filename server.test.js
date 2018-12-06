const server = require('./server');
const request = require('supertest');
const db = require('./dbinit');
const dbModel = require('./dbmodel');

beforeEach(async () => {
  return await db('students').truncate();
});

describe('get test', () => {
  test('did the test run completely?', async () => {
    const response = await request(server).get('/db');
    const dbcall = await db('students');
    expect(response.body).toEqual(dbcall);
  });
  test('did the test return a OK status message??', async () => {
    const response = await request(server).get('/db');
    expect(response.res.statusMessage).toBe('OK');
  });

  test('did the test return a status code of 200', async () => {
    const response = await request(server).get('/db');
    expect(response.status).toBe(200);
  });
});

describe('post test', () => {
  test('is it posting??', async () => {
    const response = await request(server)
      .post('/db')
      .send({ name: 'Carlo' });
    expect(response.res.statusMessage).toBe('Created');
  });
  test('does it return a status code of 201 or created?', async () => {
    const response = await request(server)
      .post('/db')
      .send({ name: 'Carlo' });
    expect(response.status).toBe(201);
  });

  test('is it completed', async () => {
    const response = await request(server)
      .post('/db')
      .send({ name: 'Carlo' });
    expect(response.res.complete).toBeTruthy();
  });
});

describe('update test', () => {
  test('update successful?', async () => {
    let id;
    const post = await request(server)
      .post('/db')
      .send({ name: 'Carlo' });
    post.body.map(item => {
      id = item;
    });

    await request(server)
      .put(`/db/${id}`)
      .send({ name: 'Test' });

    const updated = await request(server).get(`/db/${id}`);

    id.toString();

    expect(updated.body).toEqual({ id: id, name: 'Test' });
  });
});

describe('delete test', () => {
  test('does it delete the item??', async () => {
    let id;
    const post = await request(server)
      .post('/db')
      .send({ name: 'Carlo' });
    post.body.map(item => {
      id = item;
    });

    const response = await request(server).del(`/db/${id}`);
    expect(response.status).toBe(200);
  });
});

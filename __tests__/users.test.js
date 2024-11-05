import _ from 'lodash';
import fastify from 'fastify';
import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData } from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.users.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };

    const user = await models.user.query().findOne({ email: params.email });

    expect(user).toMatchObject(expected);
  });

  it('update', async () => {
    const userId = 1;
    const params = testData.users.new;

    const response = await app.inject({
      method: 'PATCH',
      url: `/users/${userId}`,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const updated = await models.user.query().findById(userId);

    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };

    expect(updated).toMatchObject(expected);
  });

  it('delete', async () => {
    const { email } = testData.users.existing;

    const responseLogIn = await app.inject({
      method: 'POST',
      url: '/session',
      payload: {
        data: testData.users.existing,
      },
    });

    expect(responseLogIn.statusCode).toBe(302);

    const [sessionCookie] = responseLogIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const user = await models.user.query().findOne({ email });

    const response = await app.inject({
      method: 'DELETE',
      url: `/users/${user.id}`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const deleted = await models.user.query().findOne({ email });

    expect(deleted).toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});

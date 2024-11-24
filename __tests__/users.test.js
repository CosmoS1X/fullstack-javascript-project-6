import _ from 'lodash';
import fastify from 'fastify';
import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData } from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  let cookie;

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

    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: testData.users.existing,
      },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;

    cookie = { [name]: value };
  });

  it('should render users page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render user creation page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render user update page', async () => {
    const { email } = testData.users.existing;
    const user = await models.user.query().findOne({ email });

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editUser', { id: user.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should create user', async () => {
    const formData = testData.users.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: formData,
      },
    });

    expect(response.statusCode).toBe(302);

    const expected = {
      ..._.omit(formData, 'password'),
      passwordDigest: encrypt(formData.password),
    };

    const user = await models.user.query().findOne({ email: formData.email });

    expect(user).toMatchObject(expected);
  });

  it('should update user', async () => {
    const { email } = testData.users.existing;
    const formData = testData.users.new;
    const user = await models.user.query().findOne({ email });

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('user', { id: user.id }),
      payload: {
        data: formData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const updated = await models.user.query().findById(user.id);

    const expected = {
      ..._.omit(formData, 'password'),
      passwordDigest: encrypt(formData.password),
    };

    expect(updated).toMatchObject(expected);
  });

  it('should delete user', async () => {
    const { email } = testData.users.existing;

    const user = await models.user.query().findOne({ email });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('user', { id: user.id }),
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

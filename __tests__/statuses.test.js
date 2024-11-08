import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

describe('test statuses CRUD', () => {
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
      url: '/session',
      payload: {
        data: testData.users.existing,
      },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;

    cookie = { [name]: value };
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const formData = testData.statuses.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      payload: {
        data: formData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const status = await models.taskStatus.query().findOne({ name: formData.name });

    expect(status).toMatchObject(formData);
  });

  it('update', async () => {
    const { name } = testData.statuses.existing;
    const formData = testData.statuses.new;
    const status = await models.taskStatus.query().findOne({ name });

    const response = await app.inject({
      method: 'PATCH',
      url: `/statuses/${status.id}`,
      payload: {
        data: formData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const updated = await models.taskStatus.query().findById(status.id);

    expect(updated).toMatchObject(formData);
  });

  it('delete', async () => {
    const { name } = testData.statuses.existing;
    const status = await models.taskStatus.query().findOne({ name });

    const response = await app.inject({
      method: 'DELETE',
      url: `/statuses/${status.id}`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const deleted = await models.taskStatus.query().findById(status.id);

    expect(deleted).toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});

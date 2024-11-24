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
      url: app.reverse('session'),
      payload: {
        data: testData.users.existing,
      },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;

    cookie = { [name]: value };
  });

  it('should render statuses page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render status creation page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render status update page', async () => {
    const { name } = testData.statuses.existing;
    const status = await models.taskStatus.query().findOne({ name });

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editStatus', { id: status.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should create status', async () => {
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

  it('should update status', async () => {
    const { name } = testData.statuses.existing;
    const formData = testData.statuses.new;
    const status = await models.taskStatus.query().findOne({ name });

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('status', { id: status.id }),
      payload: {
        data: formData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const updated = await models.taskStatus.query().findById(status.id);

    expect(updated).toMatchObject(formData);
  });

  it('should delete status', async () => {
    const { name } = testData.statuses.existing;
    const status = await models.taskStatus.query().findOne({ name });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('status', { id: status.id }),
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

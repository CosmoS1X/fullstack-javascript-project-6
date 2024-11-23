import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

describe('test labels CRUD', () => {
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

  it('should render labels page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('labels'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render label creation page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newLabel'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render label update page', async () => {
    const { name } = testData.labels.existing;
    const status = await models.label.query().findOne({ name });

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editLabel', { id: status.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should create label', async () => {
    const formData = testData.statuses.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels'),
      payload: {
        data: formData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const label = await models.label.query().findOne({ name: formData.name });

    expect(label).toMatchObject(formData);
  });

  it('should update label', async () => {
    const { name } = testData.labels.existing;
    const formData = testData.labels.new;
    const label = await models.label.query().findOne({ name });

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('label', { id: label.id }),
      payload: {
        data: formData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const updated = await models.label.query().findById(label.id);

    expect(updated).toMatchObject(formData);
  });

  it('should delete label', async () => {
    const { name } = testData.statuses.existing;
    const label = await models.taskStatus.query().findOne({ name });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('label', { id: label.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const deleted = await models.label.query().findById(label.id);

    expect(deleted).toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});

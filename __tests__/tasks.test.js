import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

describe('test tasks CRUD', () => {
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

  it('should render tasks page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render task creation page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render task page', async () => {
    const { name } = testData.tasks.existing;
    const task = await models.task.query().findOne({ name });

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('task', { id: task.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should render task update page', async () => {
    const { name } = testData.tasks.existing;
    const task = await models.task.query().findOne({ name });

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editTask', { id: task.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('should create task', async () => {
    const formData = testData.tasks.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      payload: {
        data: formData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const task = await models.task.query().findOne({ name: formData.name });

    expect(task).toMatchObject(formData);
  });

  it('should update task', async () => {
    const { name } = testData.tasks.existing;
    const formData = testData.tasks.new;

    const task = await models.task.query().findOne({ name });

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('task', { id: task.id }),
      payload: {
        data: formData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const updated = await models.task.query().findById(task.id);

    expect(updated).toMatchObject(formData);
  });

  it('should delete task', async () => {
    const { name } = testData.tasks.existing;
    const task = await models.task.query().findOne({ name });

    await app.inject({
      method: 'DELETE',
      url: app.reverse('task', { id: task.id }),
      cookies: cookie,
    });

    const rejected = await models.task.query().findById(task.id);

    expect(rejected).toStrictEqual(task);

    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: testData.users.taskCreator,
      },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const { name: cookieName, value } = sessionCookie;

    const taskCreatorCookie = { [cookieName]: value };

    await app.inject({
      method: 'DELETE',
      url: app.reverse('task', { id: task.id }),
      cookies: taskCreatorCookie,
    });

    const deleted = await models.task.query().findById(task.id);

    expect(deleted).toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});

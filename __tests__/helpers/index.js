import _ from 'lodash';
import { faker } from '@faker-js/faker';
import encrypt from '../../server/lib/secure.cjs';

const createRandomUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(),
});

const encryptPassword = (user) => ({
  ..._.omit(user, 'password'),
  passwordDigest: encrypt(user.password),
});

const usersTestData = {
  new: createRandomUser(),
  existing: createRandomUser(),
  taskCreator: createRandomUser(),
};

const getUsersModelData = () => {
  const usersData = [
    usersTestData.taskCreator,
    usersTestData.existing,
    ...faker.helpers.multiple(createRandomUser, { count: 3 }),
  ];

  return usersData.map((user) => encryptPassword(user));
};

const createRandomStatus = () => ({
  name: faker.lorem.word(),
});

const statusesTestData = {
  new: createRandomStatus(),
  existing: createRandomStatus(),
};

const getStatusesModelData = () => {
  const statuses = faker.helpers.multiple(createRandomStatus, { count: 4 });

  return [...statuses, statusesTestData.existing];
};

const createRandomTask = () => ({
  name: faker.lorem.word(),
  description: faker.lorem.text(),
  statusId: faker.number.int({ min: 1, max: 5 }),
  executorId: faker.number.int({ min: 1, max: 5 }),
});

const tasksTestData = {
  new: createRandomTask(),
  existing: { ...createRandomTask(), creatorId: 1 },
};

const getTasksModelData = () => [tasksTestData.existing];

const usersModelData = getUsersModelData();
const statusesModelData = getStatusesModelData();
const tasksModelData = getTasksModelData();

export const getTestData = () => ({
  users: usersTestData,
  statuses: statusesTestData,
  tasks: tasksTestData,
});

export const prepareData = async (app) => {
  const { knex } = app.objection;

  await knex('users').insert(usersModelData);
  await knex('task_statuses').insert(statusesModelData);
  await knex('tasks').insert(tasksModelData);
};

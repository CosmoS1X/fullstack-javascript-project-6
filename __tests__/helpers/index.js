import _ from 'lodash';
import { faker } from '@faker-js/faker';
import encrypt from '../../server/lib/secure.cjs';

const createUser = () => ({
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
  new: createUser(),
  existing: createUser(),
  taskCreator: createUser(),
};

const getUsersModelData = () => {
  const usersData = [
    usersTestData.taskCreator,
    usersTestData.existing,
    ...faker.helpers.multiple(createUser, { count: 3 }),
  ];

  return usersData.map((user) => encryptPassword(user));
};

const createStatus = () => ({
  name: faker.lorem.word(),
});

const statusesTestData = {
  new: createStatus(),
  existing: createStatus(),
};

const getStatusesModelData = () => {
  const statuses = faker.helpers.multiple(createStatus, { count: 4 });

  return [...statuses, statusesTestData.existing];
};

const createTask = () => ({
  name: faker.lorem.word(),
  description: faker.lorem.text(),
  statusId: faker.number.int({ min: 1, max: 5 }),
  executorId: faker.number.int({ min: 1, max: 5 }),
});

const tasksTestData = {
  new: createTask(),
  existing: { ...createTask(), creatorId: 1 },
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

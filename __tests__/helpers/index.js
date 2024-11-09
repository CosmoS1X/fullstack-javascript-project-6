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
};

const createRandomStatus = () => ({
  name: faker.lorem.word(),
});

const statusesTestData = {
  new: createRandomStatus(),
  existing: createRandomStatus(),
};

const getUsersModelData = () => {
  const users = faker.helpers.multiple(createRandomUser, { count: 2 });

  return [...users, usersTestData.existing].map((user) => encryptPassword(user));
};

const getStatusesModelData = () => {
  const statuses = faker.helpers.multiple(createRandomStatus, { count: 3 });

  return [...statuses, statusesTestData.existing];
};

const usersModelData = getUsersModelData();
const statusesModelData = getStatusesModelData();

export const getTestData = () => ({
  users: usersTestData,
  statuses: statusesTestData,
});

export const prepareData = async (app) => {
  const { knex } = app.objection;

  await knex('users').insert(usersModelData);
  await knex('task_statuses').insert(statusesModelData);
};

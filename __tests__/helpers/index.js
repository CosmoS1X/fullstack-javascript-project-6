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

const getUsersModelData = () => {
  const users = faker.helpers.multiple(createRandomUser, { count: 2 });

  return [...users, usersTestData.existing].map((user) => encryptPassword(user));
};

const usersModelData = getUsersModelData();

export const getTestData = () => ({
  users: usersTestData,
});

export const prepareData = async (app) => {
  const { knex } = app.objection;

  await knex('users').insert(usersModelData);
};

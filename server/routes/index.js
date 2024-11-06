// @ts-check

import welcome from './welcome.js';
import users from './users.js';
import session from './session.js';

const routes = [
  welcome,
  users,
  session,
];

export default (app) => routes.forEach((f) => f(app));

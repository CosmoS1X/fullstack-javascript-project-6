import welcome from './welcome.js';
import users from './users.js';
import session from './session.js';
import statuses from './statuses.js';

const routes = [
  welcome,
  users,
  session,
  statuses,
];

export default (app) => routes.forEach((f) => f(app));

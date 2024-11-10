import welcome from './welcome.js';
import users from './users.js';
import session from './session.js';
import taskStatuses from './taskStatuses.js';

const routes = [
  welcome,
  users,
  session,
  taskStatuses,
];

export default (app) => routes.forEach((f) => f(app));

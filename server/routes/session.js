import sessionController from '../controllers/sessionController.js';

export default (app) => {
  const controller = sessionController(app);

  app.get('/session/new', { name: 'newSession' }, controller.getSignInForm);
  app.post('/session', { name: 'session' }, controller.login);
  app.delete('/session', controller.delete);
};

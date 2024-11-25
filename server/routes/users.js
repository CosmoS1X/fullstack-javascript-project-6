import userController from '../controllers/userController.js';

export default (app) => {
  const controller = userController(app);

  app.get('/users', { name: 'users' }, controller.getList);
  app.get('/users/new', { name: 'newUser' }, controller.renderCreateForm);
  app.get('/users/:id/edit', { name: 'editUser', preValidation: app.authenticate }, controller.renderUpdateForm);
  app.post('/users', controller.create);
  app.patch('/users/:id', { name: 'user', preValidation: app.authenticate }, controller.update);
  app.delete('/users/:id', { preValidation: app.authenticate }, controller.delete);
};

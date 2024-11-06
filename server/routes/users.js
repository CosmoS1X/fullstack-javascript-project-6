import userController from '../controllers/userController.js';

export default (app) => {
  const controller = userController(app);

  app.get('/users', { name: 'users' }, controller.getList);
  app.get('/users/new', { name: 'newUser' }, controller.getCreateForm);
  app.post('/users', controller.create);
  app.get('/users/:id/edit', { name: 'editUser', preValidation: app.authenticate }, controller.getUpdateForm);
  app.patch('/users/:id', controller.update);
  app.delete('/users/:id', { preValidation: app.authenticate }, controller.delete);
};

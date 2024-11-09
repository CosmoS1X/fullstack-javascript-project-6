import userController from '../controllers/userController.js';

export default (app) => {
  const controller = userController(app);

  app.get('/users', { name: 'users' }, controller.renderUserList);
  app.get('/users/new', { name: 'newUser' }, controller.renderUserCreateForm);
  app.get('/users/:id/edit', { name: 'editUser', preValidation: app.authenticate }, controller.renderUserUpdateForm);
  app.post('/users', controller.createUser);
  app.patch('/users/:id', { preValidation: app.authenticate }, controller.updateUser);
  app.delete('/users/:id', { preValidation: app.authenticate }, controller.deleteUser);
};

import taskController from '../controllers/taskController.js';

export default (app) => {
  const controller = taskController(app);

  app.get('/tasks', { name: 'tasks', preValidation: app.authenticate }, controller.getList);
  app.get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, controller.renderCreateForm);
  app.get('/tasks/:id', { name: 'task', preValidation: app.authenticate }, controller.show);
  app.get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, controller.renderUpdateForm);
  app.post('/tasks', { preValidation: app.authenticate }, controller.create);
  app.patch('/tasks/:id', { preValidation: app.authenticate }, controller.update);
  app.delete('/tasks/:id', { preValidation: app.authenticate }, controller.delete);
};

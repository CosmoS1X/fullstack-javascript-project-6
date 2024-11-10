import taskStatusController from '../controllers/taskStatusController.js';

export default (app) => {
  const controller = taskStatusController(app);

  app.get('/statuses', { name: 'statuses', preValidation: app.authenticate }, controller.getList);
  app.get('/statuses/new', { name: 'newStatus', preValidation: app.authenticate }, controller.renderCreateForm);
  app.get('/statuses/:id/edit', { name: 'editStatus', preValidation: app.authenticate }, controller.renderUpdateForm);
  app.post('/statuses', { preValidation: app.authenticate }, controller.create);
  app.patch('/statuses/:id', { preValidation: app.authenticate }, controller.update);
  app.delete('/statuses/:id', { preValidation: app.authenticate }, controller.delete);
};

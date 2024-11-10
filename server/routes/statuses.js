import statusController from '../controllers/statusController.js';

export default (app) => {
  const controller = statusController(app);

  app.get('/statuses', { name: 'statuses', preValidation: app.authenticate }, controller.getList);
  app.get('/statuses/new', { name: 'newStatus', preValidation: app.authenticate }, controller.getCreateForm);
  app.get('/statuses/:id/edit', { name: 'editStatus', preValidation: app.authenticate }, controller.getUpdateForm);
  app.post('/statuses', { preValidation: app.authenticate }, controller.create);
  app.patch('/statuses/:id', { preValidation: app.authenticate }, controller.update);
  app.delete('/statuses/:id', { preValidation: app.authenticate }, controller.delete);
};

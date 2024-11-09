import statusController from '../controllers/statusController.js';

export default (app) => {
  const controller = statusController(app);

  app.get('/statuses', { name: 'statuses', preValidation: app.authenticate }, controller.renderStatusList);
  app.get('/statuses/new', { name: 'newStatus', preValidation: app.authenticate }, controller.renderStatusCreateForm);
  app.get('/statuses/:id/edit', { name: 'editStatus', preValidation: app.authenticate }, controller.renderStatusUpdateForm);
  app.post('/statuses', { preValidation: app.authenticate }, controller.createStatus);
  app.patch('/statuses/:id', { preValidation: app.authenticate }, controller.updateStatus);
  app.delete('/statuses/:id', { preValidation: app.authenticate }, controller.deleteStatus);
};

import labelController from '../controllers/labelController.js';

export default (app) => {
  const controller = labelController(app);

  app.get('/labels', { name: 'labels', preValidation: app.authenticate }, controller.getList);
  app.get('/labels/new', { name: 'newLabel', preValidation: app.authenticate }, controller.renderCreateForm);
  app.get('/labels/:id/edit', { name: 'editLabel', preValidation: app.authenticate }, controller.renderUpdateForm);
  app.post('/labels', { preValidation: app.authenticate }, controller.create);
  app.patch('/labels/:id', { name: 'label', preValidation: app.authenticate }, controller.update);
  app.delete('/labels/:id', { preValidation: app.authenticate }, controller.delete);
};

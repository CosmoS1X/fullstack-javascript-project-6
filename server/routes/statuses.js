import statusController from '../controllers/statusController.js';

export default (app) => {
  const controller = statusController(app);

  app.get('/statuses', { name: 'statuses' }, controller.getList);
  app.get('/statuses/new', { name: 'newStatus' }, controller.getCreateForm);

  // GET /statuses/:id/edit - страница редактирования статуса
  // POST /statuses - создание нового статуса
  // PATCH /statuses/:id - обновление статуса
  // DELETE /statuses/:id - удаление статуса
};

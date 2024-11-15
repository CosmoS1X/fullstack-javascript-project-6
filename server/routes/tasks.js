import taskController from '../controllers/taskController.js';

export default (app) => {
  const controller = taskController(app);

  app.get('/tasks', { name: 'tasks', preValidation: app.authenticate }, controller.getList);
  app.get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, controller.renderCreateForm);
  app.post('/tasks', { preValidation: app.authenticate }, controller.create);
};

// GET /tasks/:id - страница просмотра задачи
// GET /tasks/:id/edit - страница редактирования задачи
// PATCH /tasks/:id - обновление задачи
// DELETE /tasks/:id - удаление задачи

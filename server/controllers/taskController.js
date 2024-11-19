import i18next from 'i18next';

export default (app) => {
  const { models } = app.objection;

  return {
    getList: async (req, reply) => {
      const tasks = await models.task
        .query()
        .withGraphFetched('status')
        .withGraphFetched('creator')
        .withGraphFetched('executor')
        .orderBy('createdAt', 'desc');

      reply.render('tasks/index', { tasks });

      return reply;
    },
    renderCreateForm: async (req, reply) => {
      const task = new models.task();
      const users = await models.user.query();
      const statuses = await models.taskStatus.query();

      reply.render('tasks/new', { task, users, statuses });

      return reply;
    },
    create: async (req, reply) => {
      const { name, description, statusId, executorId } = req.body.data;

      const preparedData = {
        name,
        description,
        creatorId: req.session.passport.id,
        statusId: Number(statusId) || 0,
        executorId: Number(executorId) || null,
      };

      const task = new models.task();

      task.$set(preparedData);

      try {
        const validData = await models.task.fromJson(preparedData);

        await models.task.query().insert(validData);

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        const users = await models.user.query();
        const statuses = await models.taskStatus.query();
        const data = {
          task,
          users,
          statuses,
          errors: error.data,
        };

        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', data);
      }

      return reply;
    },
    show: async (req, reply) => {
      const task = await models.task
        .query()
        .findById(req.params.id)
        .withGraphFetched('status')
        .withGraphFetched('creator')
        .withGraphFetched('executor');

      reply.render('tasks/show', { task });

      return reply;
    },
    renderUpdateForm: async (req, reply) => {
      const task = await models.task
        .query()
        .findById(req.params.id)
        .withGraphFetched('status')
        .withGraphFetched('creator')
        .withGraphFetched('executor');

      const users = await models.user.query();
      const statuses = await models.taskStatus.query();

      reply.render('tasks/edit', { task, users, statuses });

      return reply;
    },
    update: async (req, reply) => {
      const task = await models.task.query().findById(req.params.id);
      const { name, description, statusId, executorId } = req.body.data;

      const preparedData = {
        name,
        description,
        statusId: Number(statusId) || 0,
        executorId: Number(executorId) || null,
      };

      try {
        await task.$query().patch(preparedData);

        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        const users = await models.user.query();
        const statuses = await models.taskStatus.query();
        const data = {
          task,
          users,
          statuses,
          errors: error.data,
        };

        req.flash('error', i18next.t('flash.tasks.edit.error'));
        reply.render('tasks/edit', data);
      }

      return reply;
    },
    delete: async (req, reply) => {
      const task = await models.task.query().findById(req.params.id);

      if (req.session.passport.id !== task.creatorId) {
        req.flash('error', i18next.t('flash.tasks.delete.reject'));
        reply.redirect(app.reverse('tasks'));

        return reply;
      }

      try {
        await models.task.query().deleteById(task.id);

        req.flash('info', i18next.t('flash.tasks.delete.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }

      return reply;
    },
  };
};

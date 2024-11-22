import i18next from 'i18next';
import { transaction } from 'objection';

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
      const labels = await models.label.query();

      reply.render('tasks/new', { task, users, statuses, labels });

      return reply;
    },
    create: async (req, reply) => {
      const { name, description, statusId, executorId, labels: labelIds } = req.body.data;

      const preparedData = {
        name,
        description,
        creatorId: req.session.passport.id,
        statusId: Number(statusId) || 0,
        executorId: Number(executorId) || null,
        labels: Array.isArray(labelIds) ? labelIds : [labelIds],
      };

      const task = new models.task();

      task.$set(preparedData);

      try {
        const validData = await models.task.fromJson(preparedData);

        await transaction(models.task, models.taskLabel, async (trxTask, trxTaskLabel) => {
          const { id } = await trxTask.query().insertAndFetch(validData);

          const promises = preparedData.labels.map(async (labelId) => {
            await trxTaskLabel.query().insert({ taskId: id, labelId: Number(labelId) });
          });

          await Promise.all(promises);
        });

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        const users = await models.user.query();
        const statuses = await models.taskStatus.query();
        const labels = await models.label.query();
        const data = {
          task,
          users,
          statuses,
          labels,
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
        .withGraphFetched('executor')
        .withGraphFetched('labels');

      reply.render('tasks/show', { task });

      return reply;
    },
    renderUpdateForm: async (req, reply) => {
      const task = await models.task
        .query()
        .findById(req.params.id)
        .withGraphFetched('status')
        .withGraphFetched('creator')
        .withGraphFetched('executor')
        .withGraphFetched('labels');

      const users = await models.user.query();
      const statuses = await models.taskStatus.query();
      const labels = await models.label.query();

      reply.render('tasks/edit', { task, users, statuses, labels });

      return reply;
    },
    update: async (req, reply) => {
      const { name, description, statusId, executorId, labels: labelIds } = req.body.data;

      const preparedData = {
        name,
        description,
        statusId: Number(statusId) || 0,
        executorId: Number(executorId) || null,
        labels: Array.isArray(labelIds) ? labelIds : [labelIds],
      };

      try {
        await transaction(models.task, models.taskLabel, async (trxTask, trxTaskLabel) => {
          const task = await trxTask.query().findById(req.params.id);

          await trxTaskLabel.query().delete().where('taskId', task.id);
          await task.$query().patch(preparedData);

          const promises = preparedData.labels.map(async (labelId) => {
            await trxTaskLabel.query().insert({ taskId: task.id, labelId: Number(labelId) });
          });

          await Promise.all(promises);
        });

        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        const task = await models.task.query().findById(req.params.id);
        const users = await models.user.query();
        const statuses = await models.taskStatus.query();
        const labels = await models.label.query();
        const data = {
          task,
          users,
          statuses,
          labels,
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

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import i18next from 'i18next';
import _ from 'lodash';

export default (app) => {
  const { models } = app.objection;

  return {
    getList: async (req, reply) => {
      const { status, executor, label, isCreatorUser } = req.query;

      const tasks = await models.task
        .query()
        .skipUndefined()
        .withGraphJoined('status')
        .withGraphJoined('creator')
        .withGraphJoined('executor')
        .withGraphJoined('labels')
        .where('statusId', status || undefined)
        .andWhere('executorId', executor || undefined)
        .andWhere('creatorId', isCreatorUser ? req.session.passport.id : undefined)
        .andWhere('labelId', label || undefined)
        .orderBy('createdAt', 'desc');

      const statuses = await models.taskStatus.query();
      const users = await models.user.query();
      const labels = await models.label.query();

      reply.render('tasks/index', { tasks, statuses, users, labels, queryParams: req.query });

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
      const { name, description, statusId, executorId, labels: labelIds = [] } = req.body.data;
      const selectedLabels = await models.label
        .query()
        .whereIn('id', Array.isArray(labelIds) ? labelIds : [labelIds]);

      const preparedData = {
        name,
        description,
        creatorId: req.session.passport.id,
        statusId: Number(statusId) || 0,
        executorId: Number(executorId) || null,
        labels: selectedLabels,
      };

      const task = new models.task();

      task.$set(preparedData);

      const transaction = await models.task.startTransaction();

      try {
        const validData = await models.task.fromJson(preparedData);
        const { id } = await models.task.query(transaction).insertAndFetch(validData);

        for (const label of preparedData.labels) {
          await models.taskLabel.query(transaction).insert({ taskId: id, labelId: label.id });
        }

        await transaction.commit();

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        await transaction.rollback();

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
      const { name, description, statusId, executorId, labels: labelIds = [] } = req.body.data;
      const task = await models.task.query().findById(req.params.id).withGraphFetched('labels');
      const selectedLabels = await models.label
        .query()
        .whereIn('id', Array.isArray(labelIds) ? labelIds : [labelIds]);

      const preparedData = {
        name,
        description,
        statusId: Number(statusId) || 0,
        executorId: Number(executorId) || null,
        labels: selectedLabels,
      };

      const transaction = await models.task.startTransaction();

      try {
        await models.taskLabel.query(transaction).delete().where('taskId', task.id);
        await task.$query(transaction).patch(_.omit(preparedData, 'labels'));

        for (const label of preparedData.labels) {
          await models.taskLabel.query(transaction).insert({ taskId: task.id, labelId: label.id });
        }

        await transaction.commit();

        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        await transaction.rollback();

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

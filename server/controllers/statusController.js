import i18next from 'i18next';

export default (app) => {
  const { models } = app.objection;

  return {
    renderStatusList: async (req, reply) => {
      const statuses = await models.taskStatus.query();

      reply.render('statuses/index', { statuses });

      return reply;
    },
    renderStatusCreateForm: (req, reply) => {
      const status = new models.taskStatus();

      reply.render('statuses/new', { status });

      return reply;
    },
    createStatus: async (req, reply) => {
      const { data } = req.body;
      const status = new models.taskStatus();

      status.$set(data);

      try {
        const validData = await models.taskStatus.fromJson(data);

        await models.taskStatus.query().insert(validData);

        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (error) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status, errors: error.data });
      }

      return reply;
    },
    renderStatusUpdateForm: async (req, reply) => {
      const status = await models.taskStatus.query().findById(req.params.id);

      reply.render('statuses/edit', { status });

      return reply;
    },
    updateStatus: async (req, reply) => {
      const status = await models.taskStatus.query().findById(req.params.id);

      try {
        await status.$query().update(req.body.data);

        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (error) {
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        reply.render('statuses/edit', { status, errors: error.data });
      }

      return reply;
    },
    deleteStatus: async (req, reply) => {
      try {
        await models.taskStatus.query().deleteById(req.params.id);

        req.flash('info', i18next.t('flash.statuses.delete.success'));
        reply.redirect(app.reverse('statuses'));
      } catch {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
      }

      return reply;
    },
  };
};

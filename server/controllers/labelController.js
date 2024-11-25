import i18next from 'i18next';

export default (app) => {
  const { models } = app.objection;

  return {
    getList: async (req, reply) => {
      const labels = await models.label.query();

      reply.render('labels/index', { labels });

      return reply;
    },
    renderCreateForm: (req, reply) => {
      const label = new models.label();

      reply.render('labels/new', label);

      return reply;
    },
    create: async (req, reply) => {
      const { data } = req.body;
      const label = new models.label();

      label.$set(data);

      try {
        const validData = await models.label.fromJson(data);

        await models.label.query().insert(validData);

        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch (error) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { label, errors: error.data });
      }

      return reply;
    },
    renderUpdateForm: async (req, reply) => {
      const label = await models.label.query().findById(req.params.id);

      reply.render('labels/edit', { label });

      return reply;
    },
    update: async (req, reply) => {
      const label = await models.label.query().findById(req.params.id);

      try {
        await label.$query().patch(req.body.data);

        req.flash('info', i18next.t('flash.labels.edit.success'));
        reply.redirect(app.reverse('labels'));
      } catch (error) {
        req.flash('error', i18next.t('flash.labels.edit.error'));
        reply.render('labels/edit', { label, errors: error.data });
      }

      return reply;
    },
    delete: async (req, reply) => {
      try {
        await models.label.query().deleteById(req.params.id);

        req.flash('info', i18next.t('flash.labels.delete.success'));
        reply.redirect(app.reverse('labels'));
      } catch (error) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
        reply.redirect(app.reverse('labels'));
      }

      return reply;
    },
  };
};

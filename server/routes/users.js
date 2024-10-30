// @ts-check

import i18next from 'i18next';

export default (app) => {
  const { models } = app.objection;

  // list of users
  app.get('/users', { name: 'users' }, async (req, reply) => {
    const users = await models.user.query();

    reply.render('users/index', { users });

    return reply;
  });

  // user creation form
  app.get('/users/new', { name: 'newUser' }, (req, reply) => {
    const user = new models.user();

    reply.render('users/new', { user });

    return reply;
  });

  // create user
  app.post('/users', async (req, reply) => {
    const { data } = req.body;
    const user = new models.user();

    user.$set(data);

    try {
      const validData = await models.user.fromJson(data);

      await models.user.query().insert(validData);

      req.flash('success', i18next.t('flash.users.create.success'));
      reply.redirect(app.reverse('root'));
    } catch (error) {
      req.flash('error', i18next.t('flash.users.create.error'));
      reply.render('users/new', { user, errors: error.data });
    }

    return reply;
  });

  // user editing form
  app.get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
    const user = await models.user.query().findById(req.params.id);

    reply.render('users/edit', { user });

    return reply;
  });

  // update user
  app.patch('/users/:id', async (req, reply) => {
    const user = await models.user.query().findById(req.params.id);

    try {
      await user.$query().update(req.body.data);

      req.flash('success', i18next.t('flash.users.edit.success'));
      reply.redirect(app.reverse('users'));
    } catch (error) {
      req.flash('error', i18next.t('flash.users.edit.error'));
      reply.render('users/edit', { user, errors: error.data });
    }

    return reply;
  });

  // delete user
  app.delete('/users/:id', async (req, reply) => {
    try {
      await models.user.query().deleteById(req.params.id);

      req.flash('success', i18next.t('flash.users.delete.success'));
      reply.redirect(app.reverse('users'));
    } catch (error) {
      req.flash('error', i18next.t('flash.users.delete.error'));
    }

    return reply;
  });
};

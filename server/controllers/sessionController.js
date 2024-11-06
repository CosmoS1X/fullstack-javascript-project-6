import i18next from 'i18next';

export default (app) => ({
  getSignInForm: (req, reply) => {
    const signInForm = {};

    reply.render('session/new', { signInForm });
  },
  login: app.fp.authenticate('form', async (req, reply, error, user) => {
    if (error) {
      return app.httpErrors.internalServerError(error);
    }

    if (!user) {
      const signInForm = req.body.data;
      const errors = {
        email: [{ message: i18next.t('flash.session.create.error') }],
      };

      reply.render('session/new', { signInForm, errors });

      return reply;
    }

    await req.logIn(user);

    req.flash('success', i18next.t('flash.session.create.success'));
    reply.redirect(app.reverse('root'));

    return reply;
  }),
  delete: (req, reply) => {
    req.logOut();
    req.flash('info', i18next.t('flash.session.delete.success'));
    reply.redirect(app.reverse('root'));
  },
});

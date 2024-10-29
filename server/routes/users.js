// @ts-check

import i18next from 'i18next';
import sql from '../db.js';
import { keysToCamelCase } from '../helpers/index.js';

export default (app) => {
  // list of users
  app.get('/users', { name: 'users' }, async (req, reply) => {
    // const users = await app.objection.models.user.query();

    const users = await sql`SELECT * FROM users`;

    reply.render('users/index', { users: users.map((user) => keysToCamelCase(user)) });

    return reply;
  });

  // new user creation form
  app.get('/users/new', { name: 'newUser' }, (req, reply) => {
    // const user = new app.objection.models.user();
    reply.render('users/new');
  });

  // create user
  app.post('/users', async (req, reply) => {
    // const user = new app.objection.models.user();
    // user.$set(req.body.data);

    try {
      const validUser = await app.objection.models.user.fromJson(req.body.data);
      // await app.objection.models.user.query().insert(validUser);

      const {
        firstName,
        lastName,
        email,
        passwordDigest,
      } = validUser;

      await sql`
        INSERT INTO users
        (first_name, last_name, email, password, created_at)
        VALUES (${firstName}, ${lastName}, ${email}, ${passwordDigest}, NOW())
      `;

      req.flash('success', i18next.t('flash.users.create.success'));
      reply.redirect(app.reverse('root'));
    } catch ({ data }) {
      req.flash('error', i18next.t('flash.users.create.error'));
      reply.render('users/new', { user: req.body.data, errors: data });
    }

    return reply;
  });

  // user editing form
  app.get('/users/:id/edit', async (req, reply) => {
    const [user] = await sql`SELECT * FROM users WHERE id = ${req.params.id}`;

    reply.render('users/edit', { user: keysToCamelCase(user) });

    return reply;
  });

  // update user
  app.patch('/users/:id', async (req, reply) => {
    const validUser = await app.objection.models.user.fromJson(req.body.data);

    const {
      firstName,
      lastName,
      email,
      passwordDigest,
    } = validUser;

    await sql`
      UPDATE users
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        email = ${email},
        password = ${passwordDigest}
      WHERE id = ${req.params.id}
    `;

    req.flash('success', i18next.t('flash.users.edit.success'));
    reply.redirect(app.reverse('users'));
  });

  // delete user
  app.delete('/users/:id', async (req, reply) => {
    await sql`DELETE FROM users WHERE id = ${req.params.id}`;

    req.flash('success', i18next.t('flash.users.delete.success'));
    reply.redirect(app.reverse('users'));
  });
};

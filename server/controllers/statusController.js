export default (app) => {
  const { models } = app.objection;

  return {
    getList: async (req, reply) => {
      const statuses = await models.taskStatus.query();

      reply.render('statuses/index', { statuses });

      return reply;
    },
    getCreateForm: (req, reply) => {
      const status = new models.taskStatus();

      reply.render('statuses/new', { status });

      return reply;
    },
  };
};

const BaseModel = require('./BaseModel.cjs');

module.exports = class TaskStatus extends BaseModel {
  static get tableName() {
    return 'statuses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['statusName'],
      properties: {
        id: { type: 'integer' },
        statusName: { type: 'string', minLength: 1 },
      },
    };
  }
};

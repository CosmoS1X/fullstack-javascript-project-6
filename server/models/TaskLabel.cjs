const BaseModel = require('./BaseModel.cjs');
const Task = require('./Task.cjs');
const Label = require('./Label.cjs');

module.exports = class TaskLabel extends BaseModel {
  static get tableName() {
    return 'tasks_labels';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['taskId', 'labelId'],
      properties: {
        id: { type: 'integer' },
        taskId: { type: 'integer', minimum: 1 },
        labelId: { type: 'integer', minimum: 1 },
      },
    };
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: BaseModel.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'tasks_labels.taskId',
          to: 'tasks.id',
        },
      },
      labels: {
        relation: BaseModel.HasManyRelation,
        modelClass: Label,
        join: {
          from: 'tasks_labels.labelId',
          to: 'labels.id',
        },
      },
    };
  }
};

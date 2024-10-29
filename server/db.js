import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  database: 'task_manager',
  username: 'cosmo',
});

export default sql;

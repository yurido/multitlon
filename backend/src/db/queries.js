const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'multitlon',
  host: 'localhost',
  database: 'multitlon',
  password: 'multitlon',
  port: 5432
});

module.exports = {
    getExerciseMetadata: () => pool.query('SELECT sid, name, item, withreps FROM exercise_metadata')
};
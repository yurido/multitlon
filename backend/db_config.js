const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'multitlon',
    password: env.DB_PASSWORD || 'multitlon',
    database: env.DB_NAME || 'multitlon',
  }
};

module.exports = config;
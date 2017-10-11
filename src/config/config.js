module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'ray',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};

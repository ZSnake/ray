module.exports = {
  username: process.env.DBUSER || 'postgres',
  password: process.env.PASSWORD || 'admin',
  database: process.env.DATABASE || 'ray',
  host: process.env.HOST || 'localhost',
  dialect: 'postgres',
};

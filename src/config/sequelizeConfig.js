module.exports = {
  username: process.env.DBUSER || 'root',
  password: process.env.PASSWORD || 'admin',
  database: process.env.DATABASE || 'ray',
  host: process.env.HOST || 'localhost',
  dialect: 'postgres',
};

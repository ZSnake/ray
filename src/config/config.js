module.exports = {
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'admin',
  database: process.env.DATABASE || 'ray',
  host: process.env.HOST || 'localhost',
  dialect: 'postgres',
};

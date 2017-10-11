module.exports = {
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'admin',
  database: process.env.DATABASE || 'ray',
  host: process.env.DATABASE_URL || 'localhost',
  dialect: 'postgres',
};

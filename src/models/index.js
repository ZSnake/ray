import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';

const basename = path.basename(module.filename);
const db = {};

const sequelize = process.env.DATABASE_URL ?
  new Sequelize(process.env.DATABASE_URL, {
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  }) : new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

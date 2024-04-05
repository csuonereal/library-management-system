const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.book = require('../models/book.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.userBook = require('../models/userbook.model')(sequelize, Sequelize);

db.role.hasMany(db.user);
db.user.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: 'role',
});
db.user.belongsToMany(db.book, {
  through: { model: db.userBook, unique: false },
  constraints: false,
});
db.book.belongsToMany(db.user, {
  through: { model: db.userBook, unique: false },
  constraints: false,
});

db.ROLES = ['user', 'admin'];

module.exports = db;

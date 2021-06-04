const {pool, dialect, HOST, DB, USER, PASSWORD} = require("../config/index");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,


  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle
  }
});

const db = {};



db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);

module.exports = db;

const { Sequelize, DataTypes, Model } = require("sequelize");

const db_database = process.env.MYSQL_DB_NAME,
  db_user = process.env.MYSQL_USER,
  db_password = process.env.MYSQL_PASSWORD,
  db_host = process.env.MYSQL_HOST;

const sequelizeObj = new Sequelize(db_database, db_user, db_password, {
  host: db_host,
  dialect: "mysql",
  port: process.env.DB_PORT,
});

module.exports = {
  Sequelize,
  sequelizeObj,
  Model,
  DataTypes,
};

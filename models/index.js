const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contactSchema = require("../models/Contact")(sequelize, Sequelize);

module.exports = db;
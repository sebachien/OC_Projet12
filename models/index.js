const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contactSchema = require("../models/Contact")(sequelize, Sequelize);
console.log("db.contactSchema  : "+db.contactSchema )
console.log("db.Sequelize : "+Sequelize)
console.log("db.sequelize : "+sequelize)
module.exports = db;
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

sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");

sequelize
  .query('SELECT * FROM salesforce.contact', { model: contact })
  .then(projects => {
    // Each record will now be mapped to the project's model.
    console.log(projects)
  })

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.contactSchema = require("../models/Contact")(sequelize, Sequelize);




module.exports = db;
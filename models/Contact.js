module.exports = (sequelize, Sequelize) => {
  const contactSchema = sequelize.define("Contact", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.STRING
    }
  });

  return contactSchema;
};
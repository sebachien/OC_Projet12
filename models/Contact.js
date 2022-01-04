module.exports = (sequelize, Sequelize) => {
  const contactSchema = sequelize.define("contact", {
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
  },
  {
    define: {
      schema: "salesforce"
    }
  });

  return contactSchema;
};
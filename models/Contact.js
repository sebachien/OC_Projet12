module.exports = (sequelize, Sequelize) => {
  const contactSchema = sequelize.define("contact", {
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password__c: {
      type: Sequelize.STRING
    }
    ,
    sfid: {
      type: Sequelize.STRING
    }
  },
  {
      schema: "salesforce",
      tableName: 'contact',
      createdAt: false,
      updatedAt: false
    
  });

  return contactSchema;
};
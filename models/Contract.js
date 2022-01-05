module.exports = (sequelize, Sequelize) => {
    const contractSchema = sequelize.define("contract", {
      accountid: {
        type: Sequelize.STRING
      },
      startdate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      billingcity: {
        type: Sequelize.STRING
      },
      billingcountry: {
        type: Sequelize.STRING
      },
      billingstreet: {
        type: Sequelize.STRING
      },
      billingpostalcode: {
        type: Sequelize.STRING
      },
      sfid: {
        type: Sequelize.STRING
      },
      contractterm: {
          type: Sequelize.INTEGER
      },
      sfid: {
        type: Sequelize.STRING
      },
      customersignedid: {
        type: Sequelize.STRING
      }

    },
    {
        schema: "salesforce",
        tableName: 'contract',
        createdAt: false,
        updatedAt: false
      
    });
  
    return contractSchema;
  };
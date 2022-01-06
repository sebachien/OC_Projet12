module.exports = (sequelize, Sequelize) => {
    const contractSchema = sequelize.define("contract", {
      accountid: {
        type: Sequelize.STRING
      },
      contractnumber: {
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
      customersignedid: {
        type: Sequelize.STRING
      },
      enddate: {
        type: Sequelize.DATE
      }

    },
    {
        schema: "salesforce",
        tableName: 'contract',
        createdAt: false,
        //updatedAt: false
      
    });
  
    return contractSchema;
  };
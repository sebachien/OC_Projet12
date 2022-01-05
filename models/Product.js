module.exports = (sequelize, Sequelize) => {
    const productSchema = sequelize.define("product", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(4000)
      },
      sfid: {
        type: Sequelize.STRING
      }
    },
    {
        schema: "salesforce",
        tableName: 'product2',
        createdAt: false,
        updatedAt: false
      
    });
  
    return productSchema;
  };
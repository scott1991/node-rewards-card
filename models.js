const { Sequelize,DataTypes } = require('sequelize');
const { join } = require('path');
const dbconf = require(join(__dirname, 'config', 'dbconf.js'));
const sequelize = new Sequelize(dbconf);




  

  (async function(){
    try {
        await sequelize.authenticate();
        // console.log('Connection has been established successfully.');

        const Customer = sequelize.define('Customer', {
          // Model attributes are defined here
          phone: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
          },
          point: {
            type: DataTypes.NUMBER,
            defaultValue:0
            // allowNull defaults to true
          }
        }, {
          // Other model options go here
      });
      
      const PointLog = sequelize.define('PointLog', {
          // Model attributes are defined here
          point_diff: {
            type: DataTypes.NUMBER,
            allowNull: false
            // allowNull defaults to true
          }
        }, {
          // Other model options go here
      });
      
      PointLog.belongsTo(Customer, 
          { onDelete:'SET NULL' });
          await sequelize.sync({ force: true });
          console.log("All models were synchronized successfully."); 
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

module.exports = sequelize.model;
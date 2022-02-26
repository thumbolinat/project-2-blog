// import the Sequelize
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password

// let sequelize;

// if (process.env.JAWSDB_URL) {
//     sequelize = new Sequelize(process.env.JAWSDB_URL);
//   } else {
<<<<<<< HEAD
   const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
=======
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
>>>>>>> 5eaa381e9684207ea37c58f6dac203d3f5346b23
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });
<<<<<<< HEAD
// }
=======
//}
>>>>>>> 5eaa381e9684207ea37c58f6dac203d3f5346b23

module.exports = sequelize;
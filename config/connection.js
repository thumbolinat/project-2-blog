require('dotenv').config();
<<<<<<< HEAD
// create connection to our database, pass in your MySQL information for username and password
let sequelize;
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });
}
=======

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true,
        },
    });

>>>>>>> d11c06ded16100fd94123fb20d60067fb0fd88e5
module.exports = sequelize;
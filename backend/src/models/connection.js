const mysql = require('mysql2/promise');

require('dotenv').config();

//console.log(process.env.MYSQL_HOSt);

const connection = mysql.createPool({
  host: process.env.MYSQL_HOSt,
  user: process.env.MYSQL_USEr,
  password: process.env.MYSQL_PASSWORd,
  database: process.env.MYSQL_Db
});

module.exports = connection;
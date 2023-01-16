require('dotenv').config();
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});
// var con = mysql.createConnection('mysql://root:R5P0rVjqUZDU2kMdupw6@containers-us-west-194.railway.app:6787/railway');
// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     port: '3306',
//     database: 'mysqlnodejsapis',

// });
// host: 'mydb.c2y3cmgycsoc.us-east-1.rds.amazonaws.com',
//     user: 'admin',
//     password: '12345678',
//     port: '3306',
//     database: 'mysqlnodejs',

con.connect((err) => {
    if (err) throw err;
    console.log("Connected");
});
module.exports = con;
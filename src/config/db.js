const mysql = require('mysql');
require('dotenv').config()
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,

});

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
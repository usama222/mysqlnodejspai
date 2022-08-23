const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'mydb.c2y3cmgycsoc.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    port: '3306',
    database: 'mysqlnodejs',

});


module.exports = con;
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bcc42c86ec168f',
    password: '0890ae4e',
    port: '3306',
    database: 'heroku_574bf8d2766e4e0',

});
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
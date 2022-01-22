const mysql = require('mysql');
const config = require('./configs/database.json');
const connection = mysql.createConnection({
    host     : config.DB.host,
    user     : config.DB.user,
    password : config.DB.password,
    database : config.DB.database
});
connection.connect(function(err, result) {
    if (err) console.log(err);
    console.log(result);
    console.log("[MySql] Connected!");
});

exports.connection = connection;

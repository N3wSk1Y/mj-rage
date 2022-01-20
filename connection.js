const mysql = require('mysql');
const config = require('./config.json');
const connection = mysql.createConnection({
    host     : config.DB.host,
    user     : config.DB.user,
    password : config.DB.password,
    database : config.DB.database
});
connection.connect(function(err) {
    if (err) console.error(err);
    console.log("Connected!");
});

exports.connection = connection;

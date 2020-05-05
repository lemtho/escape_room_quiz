var mysql = require("mysql");
var pool;

pool = mysql.createPool( 
{
    host: "35.226.161.236",
    user: "channe",
    password: "jeep",
    database: "esc_rm_db",
    connectionLimit: 5,
});

// Export pool so it can be used in other files.
module.exports.pool = pool;
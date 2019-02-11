"use strict";
exports.__esModule = true;
/*require the ibm_db module*/
var ibmdb = require("ibm_db");
// var ibmdb = require('ibm_db');
console.log("Test program to access DB2 sample database");
var connStr = "DATABASE=whx;UID=db2inst1;PWD=db2inst1;HOSTNAME=47.99.132.56;port=500000";
/*Connect to the database server
  param 1: The DSN string which has the details of database name to connect to, user id, password, hostname, portnumber
  param 2: The Callback function to execute when connection attempt to the specified database is completed
*/
try {
    var conn = ibmdb.openSync(connStr);
    var option = {
        connectTimeout: 40,
        systemNaming: true
    };
    // conn.query('')
}
catch (e) {
    console.log(e.message);
}

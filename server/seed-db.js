import * as dotenv from "dotenv";
import mysql from 'mysql';

dotenv.config();

console.log(process.env);

var connection = mysql.createConnection({
    host:
    user:
    password:
})
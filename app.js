var dotenv = require("dotenv")
var mysql = require("mysql")
var inquirer = require("inquirer")

dotenv.config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.user,
  password: process.env.db_pass,
  database: "bamazon_db"
})
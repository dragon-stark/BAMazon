var dotenv = require("dotenv")
var mysql = require("mysql")
var inquirer = require("inquirer")
var chalk = require("chalk")

dotenv.config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.user,
  password: process.env.db_pass,
  database: "bamazon_db"
});

connection.connect(function (error)
{
  if (error) throw error;
  start();
});

//function to validate the user's input which returns true if the value is valid or error otherwise
function validateInput (value)
{
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true
  } else {
    return "Please enter a whole non-zero number"
  }
}

// function to ask user questions
function start ()
{
  inquirer.prompt([{
    type: "input",
    name: "item_id",
    message: "Please enter your item ID",
    validate: validateInput,
    filter: Number
  },
  {
    type: "input",
    name: "orderQuantity",
    message: "Please enter a quantity for your item",
    validate: validateInput,
    filter: Number
  }
  ]).then(function (input)
  {
    console.log(start)
    var item = input.item_id;
    var orderQuantity = input.orderQuantity;

    var queryStr = "SELECT * FROM products WHERE ? ";

    connection.query(queryStr, { item_id: item }, function (err, data)
    {
      if (err) throw err;
      if (data.length === 0) {
        console.log(chalk.bgMagenta("Error invalid, please enter a valid ID."));
        displayInventory();
      } else {
        var productData = data[0];
        // checks to make sure there is enough quantity in stock for order
        if (orderQuantity <= productData.stock_quantity) {
          // use line 58-60 instead instead of this format
          var updateProductQuantity = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - orderQuantity) + " WHERE item_id = " + item;
          connection.query(updateProductQuantity, function (err, data)
          {

            if (err) throw err;
            console.log(chalk.yellowBright("Your order has been placed. Your total is $" + productData.price * orderQuantity));
            console.log(chalk.yellowBright("Great, you have succesfully placed your order."));
            console.log(chalk.blueBright("Thank you for shopping Bamazon."))

            connection.end();
          })
        } else {
          console.log(chalk.yellowBright("Sorry, insufficient quantity"));
          console.log(chalk.redBright("Please, modify your order."));

          displayInventory();
        }
      }
    })
  })
}

function displayInventory ()
{
  queryStr = "SELECT * FROM products";

  connection.query(queryStr, function (err, data)
  {
    if (err) throw err;
    console.log(chalk.bgYellowBright("Existing inventory: "));

    var allItems = "";
    for (var i = 0; i < data.length; i++) {
      allItems = "";
      allItems += "Item ID: " + data[i].item_id + "//";
      allItems += "Product name: " + data[i].product_name + "//";
      allItems += "Department: " + data[i].department_name + "//";
      allItems += "Price: " + data[i].price + "//";

      console.log(chalk.blueBright.bold(allItems) + chalk.yellowBright('!'));
    }
    start();
  })
}
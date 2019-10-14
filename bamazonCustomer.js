const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("table");
let itemIds = [];

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Coquisolz18",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

function clientPurchase() {
  const availableItems = {};
  const productsQuery = `SELECT item_id, product_name, price FROM products`;
  connection.query(productsQuery, function(err, data) {
    if (err) throw err;
    console.table(data);
    data.forEach(product => itemIds.push(product.item_id));
    console.log(itemIds);
    inquirer
      .prompt([
        {
          type: "list",
          name: "availableItems",
          message: "Please select which product ID to purchase",
          choices: itemIds
        }
      ])
      .then(selection => {
        console.log(selection);
      });
  });

  connection.end();
}

clientPurchase();

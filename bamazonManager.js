const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("table");
let itemsList = [];

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
  //console.log("connected as id " + connection.threadId);
});

function managerInquirer() {
  let querySelected;
  inquirer
    .prompt([
      {
        type: "list",
        name: "managerMenu",
        message: "Please select an option",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(managerSelection => {
      //console.log(managerSelection);
      if (managerSelection.managerMenu === "View Products for Sale") {
        querySelected = `SELECT * FROM products`;
        managerQuery(querySelected);
      } else if (managerSelection.managerMenu === "View Low Inventory") {
        querySelected = `SELECT * FROM products WHERE stock_quantity < 5;`;
        managerQuery(querySelected);
      } else if (managerSelection.managerMenu === "Add to Inventory") {
        connection.query(
          `SELECT item_id, product_name, stock_quantity FROM products`,
          function(err, data) {
            if (err) throw err;
            data.forEach(product => itemsList.push(product.product_name));

            inquirer
              .prompt([
                {
                  type: "list",
                  name: "addProduct",
                  message: "What product to you want to add inventory for?",
                  choices: itemsList
                },
                {
                  type: "number",
                  name: "quantity",
                  message: "How many units do you want to add to inventory?"
                }
              ])
              .then(stockSelection => {
                console.log(stockSelection.addProduct);
                console.log(stockSelection.quantity);
                connection.query(
                  `SELECT stock_quantity FROM products WHERE product_name = "${stockSelection.addProduct}";`,
                  function(err, data) {
                    querySelected = `UPDATE products SET stock_quantity = ${data[0]
                      .stock_quantity +
                      stockSelection.quantity} WHERE product_name = ${
                      stockSelection.addProduct
                    };`;
                    managerQuery(querySelected);
                  }
                );
              });
          }
        );
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              name: "newProduct",
              message: "What product would you like to add to the store?"
            },
            {
              type: "input",
              name: "newDepartment",
              message: "What is the department of the product?"
            },
            {
              type: "number",
              name: "newPrice",
              message: "What wil be the price of the product?"
            },
            {
              type: "number",
              name: "newStock",
              message: "What will be the initial stock of the product?"
            }
          ])
          .then(answers => {
            //console.log(typeof answers.newPrice);
            querySelected = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${answers.newProduct}", "${answers.newDepartment}", ${answers.newPrice}, ${answers.newStock});`;
            console.log(querySelected);

            managerQuery(querySelected);
          });
      }
    });
}

function managerQuery(query) {
  connection.query(query, function(err, data) {
    if (err) throw err;
    console.table(data);
  });
  connection.end();
}

managerInquirer();

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
  let updateQuery;
  let purchaseCost;
  const availableItems = {};
  const productsQuery = `SELECT item_id, product_name, price FROM products`;
  connection.query(productsQuery, function(err, data) {
    if (err) throw err;
    console.table(data);
    data.forEach(product => itemIds.push(product.item_id));
    //console.log(itemIds);
    inquirer
      .prompt([
        {
          type: "list",
          name: "availableItems",
          message: "Please select which product ID to purchase",
          choices: itemIds
        }
      ])
      .then(itemSelection => {
        inquirer
          .prompt([
            {
              type: "number",
              message: "How many units do you want to purchase?",
              name: "units"
            }
          ])
          .then(unitsSelection => {
            //console.log(itemSelection.availableItems);
            connection.query(
              `SELECT item_id,stock_quantity,price FROM products WHERE item_id = ${itemSelection.availableItems};`,
              function(err, data) {
                if (err) throw err;
                if (unitsSelection.units < data[0].stock_quantity) {
                  purchaseCost = data[0].price * unitsSelection.units;
                  console.log(`Your total is $${purchaseCost}`);
                  updateQuery = `UPDATE products SET stock_quantity = ${data[0]
                    .stock_quantity - unitsSelection.units} WHERE item_id = ${
                    data[0].item_id
                  };`;
                  connection.query(updateQuery, function(err, data) {
                    if (err) throw err;
                    //console.log(data);
                  });
                  connection.query(
                    `UPDATE products SET product_sales = ${purchaseCost} WHERE item_id = ${data[0].item_id};`,
                    function(err, data) {
                      if (err) throw err;
                      console.log(data);
                    }
                  );
                } else {
                  console.log("Insufficient quantity!");
                }
                connection.end();
              }
            );
          });
      });
  });

  //connection.end();
}

clientPurchase();

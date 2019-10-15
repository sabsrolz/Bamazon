const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("table");
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

//View Product Sales by Department
//Create New Department

function supervisorInquirer() {
  let queryRequest;
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Please select an option:",
        choices: ["View Product Sales by Department", "Create New Department"]
      }
    ])
    .then(selection => {
      if (selection.option === "View Product Sales by Department") {
        queryRequest = `SELECT department_id, departments.department_name, SUM(over_head_costs) AS total_over_head_costs, SUM(products.product_sales) AS total_product_sales, (products.product_sales - over_head_costs) AS total_profit
          FROM departments 
          INNER JOIN products ON departments.department_name = products.department_name
          GROUP BY department_id;`;
        supervisorQuery(queryRequest);
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              name: "deptName",
              message: "What is the name of the department?"
            },
            {
              type: "number",
              name: "overHeadCosts",
              message: "What are the over head costs?"
            }
          ])
          .then(answers => {
            queryRequest = `INSERT INTO departments (department_name, over_head_costs) VALUES ("${answers.deptName}", ${answers.overHeadCosts});`;
            supervisorQuery(queryRequest);
          });
      }
    });
}

supervisorInquirer();

function supervisorQuery(query) {
  connection.query(query, function(err, data) {
    if (err) throw err;
    console.table(data);
    //console.log(data);
  });
  connection.end();
}

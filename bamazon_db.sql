-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT, 
product_name VARCHAR(100) NOT NULL, 
department_name VARCHAR(100) NOT NULL,
price INTEGER(10) NOT NULL, 
stock_quantity INTEGER(10) NOT NULL, 
PRIMARY KEY (item_id)
);

ALTER TABLE products MODIFY price FLOAT;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Echo Studio Speakers", "Devices", "199.99", 5);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
("Kid's Bubble Umbrella", "Fashion", 14.49, 8), 
("Mixing Bowl Set", "Home & Kitchen", 19.99, 3), 
("Decorative Multicolored Pillow", "Home Bedding", 29.92, 6);

SELECT stock_quantity FROM products WHERE item_id = 2;

CREATE TABLE departments (
department_id INTEGER NOT NULL AUTO_INCREMENT, 
department_name VARCHAR(100) NOT NULL, 
over_head_costs FLOAT(10) NOT NULL, 
PRIMARY KEY (department_id)
);

ALTER TABLE products
ADD COLUMN product_sales FLOAT(10) NOT NULL AFTER stock_quantity;

ALTER TABLE products MODIFY product_sales FLOAT (2) DEFAULT 0;

SELECT * FROM departments;

ALTER TABLE departments
ADD COLUMN product_sales FLOAT(2) NOT NULL AFTER over_head_costs;

ALTER TABLE departments
ADD COLUMN total_profit FLOAT(10) NOT NULL AFTER product_sales;

ALTER TABLE departments MODIFY product_sales FLOAT (2) DEFAULT 0;
ALTER TABLE departments MODIFY total_profit FLOAT (2) DEFAULT 0;
ALTER TABLE departments DROP total_profit;

SELECT department_id, departments.department_name, over_head_costs, SUM(products.product_sales) AS total_product_sales, ((SUM(products.product_sales)) - over_head_costs) AS total_profit
FROM departments 
INNER JOIN products ON departments.department_name = products.department_name
GROUP BY department_id;

SELECT department_id, departments.department_name, over_head_costs, SUM(products.product_sales) AS total_product_sales, ((SUM(products.product_sales)) - over_head_costs) AS total_profit
FROM products 
RIGHT JOIN departments ON products.department_name= departments.department_name
GROUP BY department_id;

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
("Charging Station", "Devices", 36.99, 14), 
("Women's Print Sweater", "Fashion", 22.99, 10), 
("Quilt Bedding Set", "Home Bedding", 27.99, 20),
("Premium Loft Pillow", "Home Bedding", 64.99, 12), 
("Food Storage Containers", "Home & Kitchen", 27.99, 9), 
("Clay Face Mask", "Health & Personal Care", 45.40, 5);

INSERT INTO departments (department_name, over_head_costs)
VALUES 
("Devices", 500), 
("Fashion", 150), 
("Home Bedding", 300),
("Home & Kitchen", 100), 
("Health & Personal Care", 300);

SELECT * FROM departments;

SELECT * FROM products;

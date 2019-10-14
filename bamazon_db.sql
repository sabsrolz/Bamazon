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

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
("Kid's Bubble Umbrella", "Fashion", 14.49, 8), 
("Mixing Bowl Set", "Home & Kitchen", 19.99, 3), 
("Decorative Multicolored Pillow", "Home Bedding", 29.92, 6);





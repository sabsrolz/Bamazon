# Bamazon

Bamazon is a Command Line Interface application that takes input from customers, managers and supervisors. The app is connected to a relational database, which contains a products and a departments table. The customer can purchase a requested amount of items if there is stock availability for that particular product. The manager can view a table of all available products, low stock products, add inventory to existing products and add new products to the store. The supervisor can view store departments with aggregated sales and profit data and can add new departments to the database.

The app uses npm mysql, inquirer and table packages.

DEMO of CLI app: The following screenshots display the different functionalities available for customers, managers, and supervisors.

**Demo for customer:**

Customer has option to purchase item per item id:
![Customer has option to purchase item per item id](/demo/customer_purchase.PNG)
Enough availability and successful transaction:
![Not enough stock for customer's selected quantity](/demo/customer_stock.PNG)
Not enough stock for customer's selected quantity:
![Enough availability and successful transaction](/demo/customer_no_stock.PNG)

**Demo for Manager:**

Manager has option of viewing data for all available products:
![Manager has option of viewing data for all available products](/demo/manager_products.PNG)
Manager has option to view items that currently have a low stock (< 5 items available):
![Manager has option to view items that currently have a low stock (< 5 items available)](/demo/manager_low_stock.PNG)
Manager can add inventory to existing products:
![Manager can add inventory to existing products](/demo/manager_add_low2.PNG)
Manager can add a new product entry to products database:
![Manager can add a new product entry to products database](/demo/manager_add_product.PNG)

**Demo for Supervisor:**

Supervisor has option of viewing store data per department (including aggregated sales data):
![Supervisor has option of viewing store data per department (including aggregated sales data)](/demo/supervisor_departments.PNG)
Supervisor can add a new department to database:
![Supervisor can add a new department to database](/demo/supervisor_add.PNG)

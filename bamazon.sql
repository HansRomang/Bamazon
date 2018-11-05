DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(20) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(40),
	department_name VARCHAR(40),
	price DECIMAL(10,2),
	stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Legos", "Toys", 15.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball","Sports", 5.00, 43); 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blanket", "Home Products", 17.00, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports", 9.25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leggings", "Women's Clothing", 6.50, 65);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 999.95, 13);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Screwdriver", "Tools", 29.99, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Home Products", 321.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dragon", "Toys", 79.99, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bra", "Women's Clothing", 29.74, 88);

SELECT * FROM products;
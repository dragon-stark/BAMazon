-- DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;
USE bamazon_db;
CREATE TABLE products (
  item_id INT (10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL (10, 2) NOT NULL,
  stock_quantity INT (30) NOT NULL,
  PRIMARY KEY (item_id)
);
INSERT INTO products (
    product_name,
    department_name,
    price,
    stock_quantity
  )
VALUES
  (
    "Cards Against Humanity",
    "Toys & Games",
    10.00,
    50
  ),
  ("Teddy Bear", "Toys & Games", 5.00, 10),
  ("Barbie", "Toys & Games", 10.00, 15),
  ("Action Figure", "Toys & Games", 10.00, 20),
  (
    "Xbox Gift Cards",
    "Toys & Games",
    10.00,
    50
  ),
  (
    "Nintendo Game",
    "Toys & Games",
    50.00,
    25
  ),
  (
    "Monopoly Game",
    "Toys & Games",
    30.00,
    10
  ),
  (
    "What do you Meme Game",
    "Toys & Games",
    10.00,
    10
  ),
  (
    "Kinetic Sand",
    "Toys & Games",
    2.00,
    100
  ),
  (
    "UNO Card Game",
    "Toys & Games",
    4.00,
    15
  ),
  (
    "Poker Card Game",
    "Toys & Games",
    8.00,
    20
  );
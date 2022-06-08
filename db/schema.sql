DROP DATABASE IF EXISTS customer_db;
CREATE DATABASE customer_db;
 
USE customer_db;
CREATE TABLE users (
id INT NOT NULL,
name varchar(30) NOT NULL,
address varchar(30) NOT NULL,
email VARCHAR(30) NOT NULL,
city varchar(30),
state varchar(30),
zip integer,
phone integer,
date integer,
review varchar(200),
rating integer
);
CREATE TABLE customers  (
id INT NOT NULL,
name varchar(30) NOT NULL,
phone integer,
review varchar(200),
rating integer
)


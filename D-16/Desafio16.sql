CREATE DATABASE prueba;

SHOW DATABASES;

USE prueba;

CREATE TABLE items (nombre varchar(10) NOT NULL, categoria varchar(10) NOT NULL, stock int UNSIGNED ,id int PRIMARY KEY NOT NULL AUTO_INCREMENT);

INSERT INTO items (nombre, categoria, stock) VALUES ('Fideos', 'Harina', 20), ('Leche', 'Lacteos', 30), ('Crema', 'Lacteos', 15);

SELECT * FROM items;

DELETE FROM items WHERE id = 1;

SELECT * FROM items;

UPDATE items SET stock = 45 WHERE id = 2;

SELECT * FROM items;






























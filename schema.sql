DROP DATABASE IF EXISTS evilCorp_db;


CREATE DATABASE evilCorp_db;

USE evilCorp_db;

CREATE TABLE department(

    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id) 
    

);

CREATE TABLE role(
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30)NOT NULL,
    salary DECIMAL(30,2) NULL,
    department_id INTEGER NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
);

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30)NOT NULL,
    last_name VARCHAR(30)NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id)
    ON DELETE SET NULL 
    ON UPDATE CASCADE,
    
)



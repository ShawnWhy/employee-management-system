INSERT INTO department(name)VALUES ("IT"),
("human_resource"),("sales"),("advertising"),("security");

INSERT INTO role(title, salary, department_id)VALUES
("manager", 200000, 2),("hacker",200000,1),
("kiss_ass", 150000, 2),("Conceited_Designer",20000,4),
("baton_wielding_henchman",200000,5),("black_marketeer",10000,3);


INSERT INTO employee(
    first_name, 
    last_name ,
    role_id,
    manager_id
)
VALUES("Philip","Price",1,null),


("Shawn","Yu",3,1),("Elliot","Alderson",2,1),("Terrance","Malek",4,1)
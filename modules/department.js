var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "vvfv20el7sb2enn3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",


  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "eo49wcvwx1y9bp0r",

  // Your password
  password: "f1neecjlrga5xkxm",
  database: "g6zrnmjxipcb6r5p"
});

var view=function(){
    var query = "SELECT name  from department";
    connection.query(query, function(err,result){
        if(err) throw err;
        console.log("here are the compartamentalized legions(departments) that serve you my lord");
        console.table(result);
    })
};
//this gives you the ability to create and name a role and give it to a department;
var create=function(){
    inquirer.prompt([{
                    type: "Input",
                    message:"please type in  the type of legion(department) that you'd like to create",
                    name:"departmentCreateName"},
                    ]).then(function(data){
                                    var departmentName=data.departmentCreateName;
                                    // console.log(roleName, departmentName);
                                    connection.query("INSERT into department SET name = ?",[departmentName],function(err,result){
                                        if(err) throw err;
                                        connection.query("SELECT department.name AS department_name,role.title AS roles_assigned from department  LEFT JOIN role on department_id=department.id ORDER BY name",function(err,data){
                                            if(err) throw err;
                                            console.log("a new legion has been created!!!! please peruse at you leisure");
                                            console.table(data);
                                        })
                                        
                                    })
                                })
                
                   };
                   



var destroy= function(){
connection.query("SELECT title from department", function(err, data){
    if (err) throw err;
    // console.table(data);
    var departmentArray=[];
    for(var i=0; i<data.length;i++){
        departmentArray.push(data[i].title);
    }
    inquirer.prompt([{
        type:"list",
        message:"which of these would you like to destroy?",
        name:"foundDepartments",
        choices:departmentArray

    }]).then(function(data){
        var deleteDepartment = data.foundDepartments;
        connection.query("DELETE FROM department WHERE name = ?",[deleteDepartment],function(err,result){
            if(err) throw err;
            console.log(deleteDepartment+ " has been destroyed, here are the rest for you to do what you like");
            connection.query("SELECT name FROM department",function(err,data){
                console.table(data);


        })
    })

})
    
})}



module.exports={
destroy:destroy,
create:create,
view:view


};
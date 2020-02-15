var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",


  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "evilcorp_db"
});

var view=function(){
    var query = "SELECT title , department.name as department from role join department on role.department_id = department.id";
    connection.query(query, function(err,result){
        if(err) throw err;
        console.log("here are the types of minions that serve you and the legions that they serve under my lord");
        console.table(result);
    })
}
//this gives you the ability to create and name a role and give it to a department;
var create=function(){
    var departmentSelection=[];
            connection.query("SELECT id, name from department",function(err, result){
                if(err) throw err;
                for(var i=0; i<result.length; i++){
                    departmentSelection.push(result[i].id+". "+result[i].name)};
                    // console.log(departmentSelection);
                    inquirer.prompt([{
                        type: "Input",
                        message:"please type in  the type of minion that you'd like to create",
                        name:"roleCreateName"},
                        {type:"number",
                            message:"and how much would you like to give for its sustenance?",
                            name:"roleSalary"},
                        {type:"list",
                        message:"and what department would you like to create this in?",
                        name:"roleDepartmentChoice",
                        choices:departmentSelection}
                                ]).then(function(data){
                                    var roleName=data.roleCreateName;
                                    var departmentName= data.roleDepartmentChoice.split(".");
                                    departmentName=parseInt(departmentName[0].trim());
                                    var salary= data.roleSalary;
                                    // console.log(roleName, departmentName);
                                    connection.query("INSERT into role SET title=?,salary=?,department_id=?",[roleName,salary,departmentName],function(err,result){
                                        if(err) throw err;
                                        connection.query("SELECT title, department.name as department from role join department on department_id=department.id",function(err,data){
                                            if(err) throw err;
                                            console.log("a new role for your minions has been created! please peruse at you leisure");
                                            console.table(data);
                                        })
                                        
                                    })
                                })
                
                   });
                   

}

var destroy= function(){
connection.query("SELECT title from role", function(err, data){
    if (err) throw err;
    // console.table(data);
    var rolesArray=[];
    for(var i=0; i<data.length;i++){
        rolesArray.push(data[i].title);
    }
    inquirer.prompt([{
        type:"list",
        message:"which of these would you like to terminate?",
        name:"foundRoles",
        choices:rolesArray

    }]).then(function(data){
        var deleteRole = data.foundRoles;
        connection.query("DELETE FROM role WHERE title = ?",[deleteRole],function(err,result){
            if(err) throw err;
            console.log(deleteRole+ " has been terminated, here are the rest for you to do what you like");
            connection.query("SELECT title, department.name as department from role join department on department_id=department.id",function(err,data){
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
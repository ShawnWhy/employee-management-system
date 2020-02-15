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


var view = function(){
    inquirer.prompt([{
        type:"list",
        message:"what would you like to view by?",
        name:"viewChoice",
        choices:["by last name",
                    "by manager",
                    "by role",
                    "see all"
                    ]
    }]).then(function(data){
        switch(data.viewChoice){
            case "by last name":
                viewByLastName();break;
            case "by manager":
                viewByManager();break;
            case "by role":
                viewByRole();break;
            case "see all":
                  viewAll(); break;        }
    })
}
//destorys a particular individual under your power
var destroy= function(){
    connection.query("SELECT employee.id, concat(first_name,' ',last_name)as name, role.title from employee join role on employee.role_id=role.id order by id",
        function(err, data){
            if(err) throw err;
            var employeeList=[];
            for (var i=0; i<data.length;i++){
                employeeList.push(data[i].id + ". "+data[i].name + " "+data[i].title);
            };
            inquirer.prompt([{
                type:"list",
                message:"who would you like to destroy?",
                name:"employeeToDestroy",
                choices:employeeList
                    
                
            }]).then(function(data){
                var id = data.employeeToDestroy.split(".");
                id=parseInt(id[0].trim());
                var name = data.employeeToDestroy.split(" ");
                name = name[1]+" "+name[2];
                // console.log(name);
                connection.query("DELETE FROM employee where id = ?",[id],function(err,res){
                    if(err)throw err;
                    console.log( name + " has been TERMINATED! we will see no more of the miserable soul. but here are the ones survining their endless torment..");
                    connection.query("SELECT employee.id, concat(first_name,' ',last_name)as name, role.title from employee join role on employee.role_id=role.id",
                    function(err, data){
                        if(err) throw err;
                        console.table(data);
                        })
                      }) 
                    })
                   })
                  };

 function create(){ 
                    var query = "SELECT id, title FROM role"
                    connection.query(query, function(err,data){
                        if(err) throw err;
                          var selectRoles = data;
                        inquirer.prompt([{
                            //find the roles and teir IDs for the CEO to choose from
                            type:"list",
                            name:"roleSelect",
                            message:"what kind of creature would you like to create?",
                            choices:function(){ 
                                selectRolesArray=[];
                                for(var i = 0; i<selectRoles.length; i++){
                                    selectRolesArray.push(selectRoles[i]. id+" "+selectRoles[i].title)};
                                    return selectRolesArray;}},
            
                            {   type:"input",
                                name:"firstName",
                                message:"what the first name of which you would like to create?"
                            },
                            {  type:"input",
                                name:"lastName",
                                message:"and the last name, my dark lord?"
                            },
                            { type:"list",
                                name:"managerOrNo",
                                message:"would you like to assign this one to one of your vassals?",
                                choices:["yes","no"]
                
                                 }]).then(function(data){
                                     var role= data.roleSelect;
                                         role=role.split(".");
                                         role=parseInt(role[0]);

                                     var firstName=data.firstName;
                                     var lastName=data.lastName;
                                     var manager=data.managerOrNo;
                                     switch(manager){
                                         case "yes":
                                             promptManager(role,firstName,lastName);break;
                                         case "no":
                                             connection.query("INSERT INTO employee SET first_name=? ,last_name=? ,role_id=?",
                                             [firstName,lastName,role],function(err, result){
                                                 console.log(firstName + " is born from your black magic my master, now look at your legions in all of its glory");
                                                 connection.query("SELECT first_name, last_name, role.title from employee join role on  role.id = employee.role_id",
                                                 function(err, data){
                                                     if(err) throw err;
                                                     console.table(data);
                                                 })

                                             })
                                     }
                
                                 })
                                })
                               }
var promptManager = function(role, firstName, lastName){
connection.query("SELECT employee.id, concat(first_name,  ' ', last_name) as name FROM employee JOIN role on role.id=employee.role_id where role.title='manager'",
                function(err, data){
                    if(err) throw err;
                    var managers= data;
                    inquirer.prompt([{
                        type:"list",
                        name:"managerSelected",
                        message:"which of your vassals would you like to give this creature to?",
                        choices:function(){
                            var managerArray=[];
                            for(var i=0;i<managers.length;i++){
                                managerArray.push(managers[i].id + " . " +managers[i].name)
                            }
                            return(managerArray);
                        }

                    }]).then(function(data){ 
                        var managerId = data.managerSelected.split(".");
                        managerId=parseInt(managerId[0].trim());
                        // console.log(managerId);
                        var managerName=data.managerSelected.split(" ")
                        managerName = managerName[2]+" "+managerName[3];
                        // console.log(managerName);
                        connection.query("INSERT INTO employee SET first_name=? ,last_name =?,role_id=?,manager_id=?",[
                            firstName, lastName, role, managerId 
                        ],function(err, result){
                            if(err) throw err;
                            console.log(firstName + " " + lastName + " is BORN!! of your dark scorcery, and he is given to " + managerName+". now please look at your legions in its entirety");
                             connection.query("SELECT first_name, last_name, role.title from employee join role on  role.id = employee.role_id",function(err, data){
                                 if(err) throw err;
                                 console.table(data);
                             })
                        })
                    })
                })
    
}

                    
var viewByLastName = function(){
    connection.query("select last_name from employee",function(err,data){
        if(err) throw err;
        var lastNames=[];
        for(var i = 0;i<data.length;i++){
            lastNames.push(data[i].last_name);

        }
        inquirer.prompt([{
            type:"list",
            message:"which was the last name of the creature?",
            name:"lastName",
            choices:lastNames
        }]).then(function(data){
            connection.query("SELECT * from employee where last_name =?", [data.lastName],function(err,data){
                if(err) throw err;
                console.log("here they are my lord");
                console.table(data);
            })
        })
        
    })
    
}
  
var viewByManager = function(){
    connection.query("drop table if exists managers",function(err, result){
        if(err)throw err;
    connection.query( "create table managers as SELECT employee.id,  first_name, last_name from employee join role on role.id=employee.role_id where role.title = 'manager'",function(err,result){
        if(err) throw err;
        connection.query("SELECT employee.first_name, employee.last_name, concat(managers.first_name, ' ',managers.last_name)as manager from employee join managers on employee.manager_id = managers.id",
        function(err, data){
            if(err) throw err;
            console.log("your minions and the lords they serve under my lord");
            console.table(data);
        
        })
        
        
        
    })
})
    
}

var viewAll = function(){
    connection.query("select first_name, last_name,title, department.name as department from role right join employee on role.id=employee.role_id left join department on department.id = role.department_id",function(err,data){
        console.log("here are all of them my lord every-last-one");
        console.table(data);
    }
    )
}

var viewByRole = function(){
    connection.query("select title from role",function(err,data){
        if(err) throw err;
        var roles=[];
        for(var i = 0;i<data.length;i++){
            roles.push(data[i].title);

        }
        inquirer.prompt([{
            type:"list",
            message:"which is the role that these creatures play in you organization my lord?",
            name:"role",
            choices:roles
        }]).then(function(data){
            connection.query("SELECT first_name, last_name, title from employee join role on employee.role_id=role.id where title =?", [data.role],function(err,data){
                if(err) throw err;
                // console.log(data);
                if(data.length>0){
                console.log("here they are my lord");
                console.table(data)}
                else{console.log("we have no such creatures")};
            })
        })
        
    })
    
}


var manipulate = function(){
    inquirer.prompt([{
        type:"list",
        message:"how do you like to manipulate your pawn my lord?",
        name:"selectManipulation",
        choices:[
            "change manager",
            "change Role"
        ]}]).then(function(data){
            switch(data.selectManipulation){
                case "change manager":
                    changeManager();break;
                case "change Role":
                    changeRole();break; 
            }
        })
} 

var changeManager = function(){
    connection.query("SELECT id, first_name, last_name from employee",function(err,data){
        if(err) throw err;
        console.log(data);
        var minionsArray=[];
        for(var i=0;i< data.length;i++){
            minionsArray.push(data[i].id + " . " + data[i].first_name+" "+data[i].last_name);
        }
        connection.query("SELECT employee.id,first_name,last_name from employee join role on employee.role_id=role.id where title='manager'",function(err,data){
            if(err) throw err;
            var managersArray = [];
            for(var i=0;i< data.length;i++){
                managersArray.push(data[i].id + " . " + data[i].first_name+" "+data[i].last_name);
            }
            

        
        inquirer. prompt([{
            type:"list",
            name:"minion",
            message:"who would you like to manipulate?",
            choices:minionsArray},
            {type:"list",
            name:"manager",
            message:"who would you like to give the creature to?",
            choices:managersArray}
            
            
        
        ]).then(function(data){
            var id=data.minion.split(".");
            id=parseInt(id[0].trim());
            var managerId=data.manager.split(".");
            managerId=parseInt(managerId[0].trim());
            var minionName=data.minion.split(" ")
             minionName = minionName[2]+" "+minionName[3];
            var managerName=data.manager.split(" ")
            managerName = managerName[2]+" "+managerName[3];

            connection.query("UPDATE employee SET manager_id=? where id=?",[managerId,id],function(err,result){
                if(err) throw err;
                console.log("the dark deed is donw my lord. "+minionName+" is given to "+managerName);
                connection.query("select * from employee where id=?",[id],function(err,data){
                    console.table(data);

                })
            })
            
            
        })
    })
})}
    
var changeRole = function(){
    connection.query("SELECT id, first_name, last_name from employee",function(err,data){
        if(err) throw err;
        // console.log(data);
        var minionsArray=[];
        for(var i=0;i< data.length;i++){
            minionsArray.push(data[i].id + " . " + data[i].first_name+" "+data[i].last_name);
        }
        connection.query("SELECT id, title from role",function(err,data){
            if(err) throw err;
            var rolesArray = [];
            for(var i=0;i< data.length;i++){
                rolesArray.push(data[i].id + " . " +data[i].title);
            }
            

        
        inquirer. prompt([{
            type:"list",
            name:"minion",
            message:"who would you like to manipulate?",
            choices:minionsArray},
            {type:"list",
            name:"role",
            message:"what would you like to transform the creature into?",
            choices:rolesArray}
            
            
        
        ]).then(function(data){
            var id=data.minion.split(".");
            id=parseInt(id[0].trim());
            var roleId=data.role.split(".");
            roleId=parseInt(roleId[0].trim());
            var roleName=data.role.split(" ")
             roleName = roleName[2]
           

            connection.query("UPDATE employee SET role_id=? where id=?",[roleId,id],function(err,result){
                if(err) throw err;
                console.log("the dark deed is donw my lord. a new "+ roleName + " has been created!");
                connection.query("select * from employee where id=?",[id],function(err,data){
                    console.table(data);

                })
            })
            
            
        })
    })
})}

module.exports={
    destroy:destroy,
    create:create,
    view:view,
    promptManager:promptManager,
    viewAll:viewAll,
    viewByLastName:viewByLastName,
    viewByManager:viewByManager,
    manipulate:manipulate,
    viewByRole:viewByRole,
    changeManager:changeManager,
    changeRole:changeRole,


    
    
    };

    

// "select first_name, last_name,title, department.name from role right join employee on role.id=employee.role_id left join department on department.id = role.department_id" ,
// "create table managers as SELECT employee.id,  first_name, last_name from employee join role on role.id=employee.role_id where role.title = 'manager'"
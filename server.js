var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var role = require("./modules/role");
var department=require("./modules/department");
var minion = require("./modules/minion");
// var manipulate = require("./modules/manipulateSubFunctions");
// var create = require("./modules/createSubFunction");
// var terminate = require("./modules/terminateSubFunctions");

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



var rolePrompt=function(){
    inquirer.prompt([{
        type:"list",
        message:"what would you like to do with these so called 'roles' oh my dark lord?",
        name:"roleActionSelect",
        choices:["destroy","create","view"]
        
    }]).then(function(data){
        switch(data.roleActionSelect){
                case "destroy":
                    role.destroy();break;
                case "create" :
                    role.create(); break;
                case "view":
                    role.view(); break;

        }
    })

};
var departmentPrompt=function(){
    inquirer.prompt([{
        type:"list",
        message:"what would you like to do with your evil departments my evil master? ",
        name:"departmentActionSelect",
        choices:["destroy","create","view"] 
        
    }]).then(function(data){
        switch(data.departmentActionSelect){
                case "destroy":
                    department.destroy();break;
                case "create" :
                    department.create(); break;
                case "view":
                    department.view(); break;

        }
    })

};

var minionPrompt=function(){
    inquirer.prompt([{
        type:"list",
        message:"How would you like to manipulate these unfortunate creatures?",
        name:"roleActionSelect",
        choices:["destroy","create","view","manipulate"]
        
    }]).then(function(data){
        switch(data.roleActionSelect){
                case "destroy":
                    minion.destroy.destroy();break;
                case "create" :
                    minion.create(); break;
                case "view":
                    minion.view(); break;
                case "manipulate":
                    minion.manipulate();break;

        }
    })

};
var StartBusiness = function(){
    inquirer.prompt([{
        type:"list",
        name:"whatIsToBeDone",
        message:"On what Level would you like to manipulate you Dark Empire my Lord?",
        choices:["Indivial Minion", 
                    "On the Functions of Minions",
                    "On the Department Level"]
    }]).then(function(data){
        switch(data.whatIsToBeDone){
            case "Indivial Minion":
                minionPrompt();break;
            case "On the Functions of Minions":
                rolePrompt();break;
            case "On the Department Level":
                departmentPrompt();break;

        }
        
    })
}
StartBusiness();


// var roleSelection = function(){
//     var roleTitles;
//     var query = "SELECT title FROM role"
//     connection.query(query, function(err, result){
//         if(err) throw err;
//         roleTitles=result;
//         inquirer.prompt([{
//             type:"list",
//             message:"which 'role' my dark lord?",
//             name: "roleOptionSelect",
//             choices:function(){
//                var roleChoices = [];
//                 for (var i=0;i<roleTitles.length;i++){
//                     roleChoices.push(roleTitles[i].title);
//                      };
//                      return roleChoices;
//             }
    
//         }]).then(function(data){console.log(data.roleOptionSelect)})

//     });
    
// }





// var createPrompt = function(){
//     inquirer.prompt([
//     {type:array,
//         name:"createAction",
//         message:"what would you like to create my dark master?",
//         choices:["a hireling",
//             "a new type of creature to do my bidding",
//             "a whole department of minions",
//         ]
    
//     }]).then(function(data){
//         switch(data.createaAction){
//             case "a hireling":
//                 create.hire();break;
//             case "a new type of creature to do my bidding":
//                 create.createRole();break;
//             case "a whole department of minions":
//                 create.createDepartment(); break;
//         }
    
//     })
// };

// var terminatePrompt= function(){
//     inquirer.prompt([
//         {type:array,
//             name:"terminateAction",
//             message:"How can I apease your anger my master? what would you like to destroy?",
//             choices:["sacrafice a minion",
//                 "purge to a whole race of creatures(terminate a role in human speech)",
//                 "a whole department of minionslay waste to a entire deparment",
//             ]
        
//         }]).then(function(data){
//             switch(data.terminateAction){
//                 case "sacrafice a minion":
//                     terminate.fire();break;
//                 case "purge a whole race of creatures(terminate a role in human speech)":
//                     terminate.terminateRole();break;
//                 case "a whole department of minionslay waste to a entire deparment":
//                     terminate.terminateDepartment(); break;
//             }
        
//         })
// };

// var manipulatePrompt= function(){
//     inquirer.prompt([
//         {type:array,
//             name:"manipulateAction",
//             message:"My dark master, how would you like to manipulate the inner working of your organizations?",
//             choices:["minitor a hireling",
//                 "monitor a whole race of creatures(view roles in human speech)",
//                 "over see a entire department",
//                 "admire my vassals and thier underlings (view employees by manager in human speech)",
//                 "assign a hireling to another vassal",
//             ]
        
//         }]).then(function(data){
//             switch(data.manipulateAction){
//                 case "minitor a hireling":
//                     manipulate.fire();break;
//                 case "purge to a whole race of creatures(terminate a role in human speech)":
//                     manipulate.terminateRole();break;
//                 case "a whole department of minionslay waste to a entire deparment":
//                     manipulate.terminateDepartment(); break;
//             }
        
//         })
// };


    
  

// connection.connect(function(err) {
//   if (err) throw err;
//   manager();
// });

// var manager = function(){
// inquirer.prompt([
//     {type:array,
//     name:"action",
//     message:"what do you wish to do my dark master?",
//     choices: ["Create",
//     "monitor",
//     "manipulate"
       
//     ] }



// ]).then(function(data){
//     switch(data.action){
//         case "create":
//             createPrompt();break;
//         case "terminate": 
//             terminatePrompt();break;
//         case "manipulate":
//             manipulatePrompt();break;
//     }
// })
// };





// "'terminate' Employee",
// "create a hireling",
// "create a entire department to de my bidding",
// "monitor the status of one my my departments",
// ""
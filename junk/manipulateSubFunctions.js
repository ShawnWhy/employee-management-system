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

class manipulate {
         constructor(){
 
  function viewAllEmployee(){

    var query = "SELECT First_name, last_name, role FROM employee inner join role on id = role_id sort by last_name desc";
    console.table(query);
  }
  function viewRoles(){
    var query = "SELECT DISTINCT title, sum(first_name) as number_of_minions FROM role INNER JOIN employee where employee.role_id = role.id "
  connection.query(query, function(err, res ){
    if(err) throw err;
    console.table(res);
  })
    
  }
  function viewDepartments(){
    var query = "SELECT name from department";
    connection.query(query, function(err, res ){
      if(err) throw err;
      console.table(res);
  })}
  //picking a single employee to view
  function ViewSingle(){
    inquirer.prompt([{
      type:Input,
      name:"firstname",
      message:"please give the first name of the one you would like to monitor"
    }]).then(function(data){
      //select all the employee with the same first name
      var firstName = data.firstname;
      var query = "SELECT last_name FROM employee WHERE?";
     
      connection.query(query,{first_name:firstName},function(err, res){
        if(err) throw err;
        var lastNames=res;
        console.log("here are the last namesl"+LastNames);
        if(lastNames.length>1){
          getLastNameAndView(lastNames)
        }
        else{
          query="SELECT first_name,last_name,title,salary FROM employee INNER JOIN role ON employee.role_id=role.id WHERE ?";
          connection.query(query,{fist_name:firstName},function(err, res){
          if(err) throw err;
          console.table(res);

        })}

 })
  })}

  function ChangeManagers(){
    inquirer.prompt([{
      type:Input,
      name:"firstname",
      message:"please give the first name of the one you would like to trade to another"
    }]).then(function(data){
      //select all the employee with the same first name
      var firstName = data.firstname;
      var query = "SELECT last_name FROM employee WHERE?";
     connection.query(query,{first_name:firstName},function(err, res){
        if(err) throw err;
        var lastNames=res;
        console.log("here are the last namesl"+LastNames);
        if(lastNames.length>1){
          getLastNameAndView(lastNames)
  }})})}
  
function getLastNameAndView(lastNames){

    //find them in the database using a query and list them out as an array of choices
    inquirer.prompt([{
      type:Array,
      name:"selectLastName",
      message:"and what is the unfortunate one's last name my Dark Lord?",
      choices: function(){
        var lastNameArray = [];
        for(var i=0; i<lastNames.length;i++){
          lastNameArray.push(lastNames[i]);
        }
        return lastNameArray;
      }
      //list result of the query with the chose first and last last name with the role attached
      //do this by joining the employee table with the role table on role_id=role's id
}]).then(function(data){
var lastName = data.selectLastName;
query="SELECT first_name,last_name,title,salary FROM employee INNER JOIN role ON employee.role_id=role.id WHERE ?";
connection.query(query,{fist_name:firstName,last_name:lastName},function(err, res){
if(err) throw err;
console.table(res);
}
)
 }
)}

function getLastNameAndManager(lastNames){

  //find them in the database using a query and list them out as an array of choices
  inquirer.prompt([{
    type:Array,
    name:"selectLastName",
    message:"and what is the unfortunate one's last name my Dark Lord?",
    choices: function(){
      var lastNameArray = [];
      for(var i=0; i<lastNames.length;i++){
        lastNameArray.push(lastNames[i]);
      }
      return lastNameArray;
    }
    //list result of the query with the chose first and last last name with the role attached
    //do this by joining the employee table with the role table on role_id=role's id
}]).then(function(data){
var lastName = data.selectLastName;
query="SELECT first_name,last_name,title,manager_id INNER JOIN role ON employee.role_id=role.id WHERE ?";
connection.query(query,{fist_name:firstName,last_name:lastName},function(err, res){
if(err) throw err;
console.table(res);
}
)
}
)}


 
 
  }}


  module.exports=manipulatesubFunctions;
  

//  
// var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;


// const table = cTable.getTable([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// console.log(table);

// // prints
// name  age
// ----  ---
// foo   10
// bar   20

// class employee {
//   constructor(name,email, position,){
//       this.name=name;
//       this.email=email;
//       this.position=position;
//   }}
  


//   module.exports = employee; 

// function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function(err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].artist);
//       }
//       runSearch();
//     });
//   }
  
//   function rangeSearch() {
//     inquirer
//       .prompt([
//         {
//           name: "start",
//           type: "input",
//           message: "Enter starting position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         },
//         {
//           name: "end",
//           type: "input",
//           message: "Enter ending position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//         connection.query(query, [answer.start, answer.end], function(err, res) {
//           if (err) throw err;
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Position: " +
//                 res[i].position +
//                 " || Song: " +
//                 res[i].song +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Year: " +
//                 res[i].year
//             );
//           }
//           runSearch();
//         });
//       });
//   }
  
//   function songSearch() {
//     inquirer
//       .prompt({
//         name: "song",
//         type: "input",
//         message: "What song would you like to look for?"
//       })
//       .then(function(answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//           if (err) throw err;
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         });
//       });
//   }
  
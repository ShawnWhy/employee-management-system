
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

query="select last_name, first_name from employee join role on employee.role_id = role.id where title LIKE  'manager'";
connection.query(query, function(err, res){
    if(err) throw err;
var managers = res;
console.log(managers)})
class create{
    constructor(){
function createEmployee(){ 
    var query = "SELECT Id, title FROM role"
    connection.query(query, function(err,result){
        if(err) throw err;
          var selectRoles = result;
        inquirer.prompt([{
            //find the roles and teir IDs for the CEO to choose from
            type:"array",
            name:"RoleSelect",
            message:"what kind of creature would you like to create?",
            options:function(selectRoles){ 
                selectRolesArray=[];
                for(var i = 0; i<selectRoles.length; i++){
                    selectRolesArray.push(selectRoles[0].id+" "+selectRoles[0].title)};
                    return selectRolesArray;

            }

    
        }]).then(function(data){
            var roleData=data;
            inquirer.prompt([{
                type:input ,
                name:"firstName",
                message:"what the first name of which you would like to create?"
            },
                 {

                    type:input,
                    name:"lastName",
                    message:"and the last name, my dark lord?"
                }])
                //select wether or not to assign a manager to the employee
                 .then(function(roleData,data){
                     query="SELECT id, CONCAT(first_name, last_name) as name from employee join  where  "
                connection.query()
                     console.log(roleData);
                 var nameData = data ;
                 inquirer.prompt([{
                     type:Array,
                     name:"managerOrNo",
                     message:"would you like to assign this one to one of your vassals?",
                     options:["yes","no"]

                 }]).then(function(data){

                 })

                
                    query = "INSERT INTO  employee(first_name, last_name, role_id, manager_id)VALUES(?)"
                
                  }
                 )
             

        })
    
    })
    } 


    
;



    }
}


// odule.exports = function(app){
//     // var journal =[{"title":"tests","body":"asfdfsd","journal":"food"},{"title":"lskfjsdlk","body":"sdjlfkjdsklf","journal":"excercise"},{"title":"ouch","body":"dude","journal":"food"}];

    

//     app.get("/api/notes",function(req, res){

//     res.json(journal)});


//     app.get("/api/notes/:singleNote", function(req, res){
//         console.log(req.params.singleNote);
//         var selected = req.params.singleNote;
//         for(var i=0;i<journal.length;i++){
//              if(selected.toLocaleLowerCase() === journal[i].title.toLocaleLowerCase()){
//                  return res.json(journal[i])  
//              }
//         }
//         return res.send("not character found");

//     }
// )
//  app.post("/api/notes", function(req,res){
//      var newNote = req.body;
//      journal.push(newNote);
//      res.json(newNote);
//      save(journal);
     
//  })

//  app.post("/api/notes/clear",function(req,res){
//      journal.length=0;
//      res.json({ok:true});

//      res.sendFile(path.join(__dirname,"/public/assets/js/index.js"))
//     })
// app.delete("/api/notes/:note",(req,res)=>{
//     console.log("deleting "+ req.params.note);
//     var noteDelete=req.params.note;
//     journal=journal.filter((item)=>item.title!==noteDelete);
//     res.json(journal);
//     save(journal);


//  })
// }
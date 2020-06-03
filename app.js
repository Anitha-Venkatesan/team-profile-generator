const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const lodash = require("lodash");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employeeArray=[];
inquirer
  .prompt([       
    {
      type: "list",
      message: "What is your role in the team as an employee?",
      name: "role",
      choices : ["Engineer","Intern","Manager"]
    }
    ]).then(function(response) {
      switch(response.role) {
        case "Engineer" :
           inquirer
           .prompt([
            {
              type: "input",
              message: "What is your name as an employee?",
              name: "name",
              validate: (input) => {
                if (lodash.isEmpty(input)) {
                 return "Employee name is required.";
                }
              return true;
              }
            },
            {
              type: "input",
              message: "What is your id as an employee?",
              name: "id",
              validate: (input) => {
                if (lodash.isEmpty(input)) {
                 return "Employee id is required.";
                }
              return true;
              }
            },
            {
              type: "input",
              message: "What is your GitHub user name as an employee?",
              name: "github",
              validate: (input) => {
               if (lodash.isEmpty(input)) {
                return "Employee github user name  is required.";
              }
              return true;
              }
            },
            {
              type: "input",
              message: "What is your email id as an employee?",
              name: "email",
              validate: (input) => {
                if (lodash.isEmpty(input)) {
                return "Employee email id is required.";
              }
              return true;
              }
            },
          ]).then (function (engineerResponse){
             console.log(engineerResponse);
             let newEngineer = new Engineer(engineerResponse.name,engineerResponse.id,engineerResponse.github,engineerResponse.email);
             console.log(newEngineer);
             employeeArray.push(newEngineer);
             });
             break;
       case "Intern" :
           inquirer
           .prompt([
            {
              type: "input",
              message: "What is your name as an employee?",
              name: "name",
              validate: (input) => {
                if (lodash.isEmpty(input)) {
                 return "Employee name is required.";
                }
              return true;
              }
            },
            {
              type: "input",
              message: "What is your id as an employee?",
              name: "id",
              validate: (input) => {
                if (lodash.isEmpty(input)) {
                 return "Employee id is required.";
                }
              return true;
              }
            },
            {
              type: "input",
              message: "What is your school name as an employee?",
              name: "school",
              validate: (input) => {
               if (lodash.isEmpty(input)) {
                return "Employee school name  is required.";
              }
              return true;
              }
            },
            {
              type: "input",
              message: "What is your email id as an employee?",
              name: "email",
              validate: (input) => {
                if (lodash.isEmpty(input)) {
                return "Employee email id is required.";
              }
              return true;
              }
            },
          ]).then (function (internResponse){
              console.log(internResponse);
              let newIntern = new Intern(internResponse.name,internResponse.id,internResponse.school,internResponse.email);
              console.log(newIntern);
              employeeArray.push(newIntern);
             });
             break;
       case "Manager" :
          inquirer
          .prompt([
             {
               type: "input",
               message: "What is your name as an employee?",
               name: "name",
               validate: (input) => {
                  if (lodash.isEmpty(input)) {
                    return "Employee name is required.";
                  }
                return true;
                }
             },
             {
              type: "input",
              message: "What is your id as an employee?",
              name: "id",
              validate: (input) => {
                if (lodash.isEmpty(input)) {
                 return "Employee id is required.";
                }
              return true;
              }
            },
             {
                type: "input",
                message: "What is your office number as an employee?",
                name: "officeNumber",
                validate: (input) => {
                  if (lodash.isEmpty(input)) {
                    return "Employee office number  is required.";
                  }
                return true;
                }
              },
              {
                type: "input",
                message: "What is your email id as an employee?",
                name: "email",
                validate: (input) => {
                  if (lodash.isEmpty(input)) {
                    return "Employee email id is required.";
                  }
                return true;
                }
              },
          ]).then (function (managerResponse){
              console.log(managerResponse);
              let newManager = new Manager(managerResponse.name,managerResponse.id,managerResponse.officeNumber,managerResponse.email);
              console.log(newManager);
              employeeArray.push(newManager);
            }); 
    }  
  }).then(async function(data) {
    try{
      const renderHtml = await render(employeeArray); 
      console.log(renderHtml);    
    }
    catch(err) {
      console.log(err);
    }
  });
 
  
  

    
     


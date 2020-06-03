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
    }]).then(function(response) {
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
             let newEngineer = new Engineer(engineerResponse.name,engineerResponse.github,engineerResponse.email);
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
              let newIntern = new Intern(internResponse.name,internResponse.school,internResponse.email);
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
              let newManager = new Manager(managerResponse.name,managerResponse.officeNumber,managerResponse.email);
              console.log(newManager);
              employeeArray.push(newManager);
            }); 
    }
  });
    
     
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

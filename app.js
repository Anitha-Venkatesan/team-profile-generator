const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const lodash = require("lodash");
const render = require("./lib/htmlRenderer");
//asynchronous function for getting user input
async function getInputsFromUser() {
  const response = await inquirer
  .prompt([       
    {
      type: "list",
      message: "What is your role in the team as an employee?",
      name: "role",
      choices : ["Engineer","Intern","Manager"]
    }
  ]);

  const questions = [
    {
      type: "input",
      message: "What is your name as an employee?",
      name: "name",
      validate: (input) => {// lodash validation method for validating user input
        if (lodash.isEmpty(input)) {
         return "Employee name is required.";
        }
      return true;
      }
    },
    {
      type: "input",
      message: "What is your employee id?",
      name: "id",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
         return "Employee id is required.";
        }
        if (isNaN(input)) {
          return "Please enter valid number";
        } 
      return true;
      }
    },
    {
      type: "input",
      message: "What is your email id?",
      name: "email",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
        return "Employee email id is required.";
      }
      return true;
      }
    }
  ];
  switch(response.role) {
    case "Engineer" :
      questions.push( {
        type: "input",
        message: "What is your GitHub user name as an employee?",
        name: "github",
        validate: (input) => {
         if (lodash.isEmpty(input)) {
          return "Employee github user name  is required.";
        }
        return true;
        }        
      });
      break;
    case "Intern":
      questions.push({
        type: "input",
        message: "What is your school name as an employee?",
        name: "school",
        validate: (input) => {
         if (lodash.isEmpty(input)) {
          return "Employee school name  is required.";
        }
        return true;
        }
      });
      break;
    case "Manager":
      questions.push({
        type: "input",
        message: "What is your office number as an employee?",
        name: "officeNumber",
        validate: (input) => {
          if (lodash.isEmpty(input)) {
            return "Employee office number  is required.";
          }
        return true;
        }
      });
      break;
  }

  const commonResponse = await inquirer.prompt(questions);
  //returning the user response as an object  
  return {
    role: response.role,
    name: commonResponse.name,
    id: commonResponse.id,
    email: commonResponse.email,
    github: commonResponse.github,
    school: commonResponse.school,
    officeNumber: commonResponse.officeNumber
  };
}
//asynchronous function for getting number of employees to add in the team
async function getNumberOfEmployees() {
  const response = await inquirer
    .prompt([       
      {
        message: "How many employees you want to add in the team?",
        name: "numberOfEmployees",
        validate: (input) => {
          if (lodash.isEmpty(input)) {
           return "Please enter number of employees to add.";
          }
          if (isNaN(input)) {
            return "Please enter valid number";
          } 
          return true;
        }
      }
    ]);

  const numberOfEmployees = parseInt(response.numberOfEmployees);
  const numberOfEmployeesArray = lodash.range(numberOfEmployees);
  let employeeArray=[];
  //for of loop for running the numberOfEmployeesArray sequentially
  for (const count of numberOfEmployeesArray) {
    const employee = await getInputsFromUser();

    switch(employee.role) {//creating new objects for each constructor 
      case "Engineer":
        const engineer = new Engineer(employee.name, employee.id, employee.email, employee.github);
        employeeArray.push(engineer);
        break;
      case "Intern":
        const intern = new Intern(employee.name, employee.id, employee.email, employee.school);
        employeeArray.push(intern);
        break;
      case "Manager":
        const manager = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
        employeeArray.push(manager);
        break;
    }
  }
  const OUTPUT_DIR = path.resolve(__dirname, "output");
  const outputPath = path.join(OUTPUT_DIR, "team.html");
  const renderHtml = render(employeeArray);
  fs.appendFileSync(outputPath,renderHtml);  
}

var dir = './output';
//creating a new directory 'output' for html file
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
//deleting the output directory everytime before adding the team member
try {
  fs.unlinkSync('./output/team.html');
  console.log('successfully deleted /output/team.html');
} catch (err) {
  // handle the error
}
getNumberOfEmployees();

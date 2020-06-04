const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const lodash = require("lodash");


const templatesDir = path.resolve(__dirname, "../templates");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
      validate: (input) => {
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

async function getNumberOfEmployees() {
  const response = await inquirer
    .prompt([       
      {
        message: "How many employees you want to add in the team?",
        name: "numberOfEmployees"
      }
    ]);

  const numberOfEmployees = parseInt(response.numberOfEmployees);
  const numberOfEmployeesArray = lodash.range(numberOfEmployees);
  let employeeArray=[];

  for (const count of numberOfEmployeesArray) {
    const employee = await getInputsFromUser();

    switch(employee.role) {
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

  const renderHtml = render(employeeArray);
  fs.appendFileSync(outputPath,renderHtml);  
}
try {
  fs.unlinkSync('./output/team.html');
  console.log('successfully deleted /output/team.html');
} catch (err) {
  // handle the error
}
getNumberOfEmployees();

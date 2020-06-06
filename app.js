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
  console.log("");
  const response = await inquirer
    .prompt([
      {
        type: "list",
        message: "Add your role in the team as an employee?",
        name: "role",
        choices: ["Engineer", "Intern", "I dont want to add anymore employees"]
      }
    ]);
  // If employee.role is ["Engineer", "Intern"] ,then ask questions;
  if (lodash.includes(["Engineer", "Intern"], response.role)) {
    const questions = [
      {
        type: "input",
        message: "What is employee full name ?",
        name: "name",
        validate: (input) => {
          // lodash validation method for validating user input
          if (lodash.isEmpty(input)) {
            return "Employee name is required.";
          }
          if (!isNaN(input)) {
            return "Please enter name in string";
          }
          return true;
        }
      },
      {
        type: "input",
        message: "What is id of the employee?",
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
        message: "What is email id of the employee?",
        name: "email",
        validate: (input) => {
          if (lodash.isEmpty(input)) {
            return "Employee email id is required.";
          }
          if (!lodash.isMatch(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return "Enter valid email id.";
          }
          return true;
        }
      }
    ];
    switch (response.role) {
      case "Engineer":
        questions.push({
          type: "input",
          message: "What is GitHub user name of the engineer?",
          name: "github",
          validate: (input) => {
            if (lodash.isEmpty(input)) {
              return "Employee github user name  is required.";
            }
            if (!isNaN(input)) {
              return "Please enter github user name in string";
            }
            return true;
          }
        });
        break;
      case "Intern":
        questions.push({
          type: "input",
          message: "What is school name of the intern?",
          name: "school",
          validate: (input) => {
            if (lodash.isEmpty(input)) {
              return "Employee school name  is required.";
            }
            if (!isNaN(input)) {
              return "Please enter school name in string";
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
      school: commonResponse.school
    };
  } else {
    console.log("Generated team.html page successfully");
    console.log("");
    // if the response.role is not ["Engineer", "Intern"] then dont ask questions 
    return {
      role: response.role
    };    
  }
}


//asynchronous function for getting manager details to add in the team
async function getManagerInfo() {
  console.log("");
  console.log("Build a team with your team member details");
  console.log("------------------------------------------");
  console.log("");
  console.log("Add a Manager to your team?");
  const responseManager = await inquirer
    .prompt([
      {
        type: "input",
        message: "What is the manager name ?",
        name: "name",
        validate: (input) => {
          if (lodash.isEmpty(input)) {
            return "Employee name is required.";
          }
          if (!isNaN(input)) {
            return "Please enter manager name in string";
          }
          return true;
        }
      },
      {
        type: "input",
        message: "What is the manager employee id?",
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
        message: "What is manager email id?",
        name: "email",
        validate: (input) => {
          if (lodash.isEmpty(input)) {
            return "Employee email id is required.";
          }
          if (!lodash.isMatch(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return "Enter valid email id.";
          }
          return true;
        }
      },
      {
        type: "input",
        message: "What is manager office number?",
        name: "officeNumber",
        validate: (input) => {
          if (lodash.isEmpty(input)) {
            return "Employee office number  is required.";
          }
          if (isNaN(input)) {
            return "Please enter valid number";
          }
          return true;
        }
      }
    ]);

  let employeeArray = [];
  const manager = new Manager(responseManager.name, responseManager.id, responseManager.email, responseManager.officeNumber);
  employeeArray.push(manager);
  while (true) {
    const employee = await getInputsFromUser();
    // If employee.role is not in ["Engineer", "Intern"] array then break;
    if (!lodash.includes(["Engineer", "Intern"], employee.role)) {
      break;
    }
    switch (employee.role) {
      //creating new objects for each role 
      case "Engineer":
        const engineer = new Engineer(employee.name, employee.id, employee.email, employee.github);
        employeeArray.push(engineer);
        break;
      case "Intern":
        const intern = new Intern(employee.name, employee.id, employee.email, employee.school);
        employeeArray.push(intern);
        break;
    }
  }


  const OUTPUT_DIR = path.resolve(__dirname, "output");
  const outputPath = path.join(OUTPUT_DIR, "team.html");
  const renderHtml = render(employeeArray);
  fs.appendFileSync(outputPath, renderHtml);
}
var dir = './output';
//creating a new directory 'output' for html file
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
//deleting the output directory everytime before adding the team member
try {
  fs.unlinkSync('./output/team.html');
} catch (err) {
  // handle the error
}
getManagerInfo();
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
      message: "What is your role in the team as an employee?",
      name: "role",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Employee role is required.";
        }
        return true;
      }
    },
    {
      type: "input",
      message: "What is your employee ID?",
      name: "id",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Employee ID is required.";
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
    },

    {
      type: "input",
      message: "What is your office number?",
      name: "officeNumber",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Employee office number is required.";
        }
        return true;
      }
    },
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "github",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Employee Github user name is required.";
        }
        return true;
      }
    },
    {
      type: "input",
      message: "What is your school name?",
      name: "school",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Employee school name is required.";
        }
        return true;
      }
    }
  ])
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee")

class Engineer extends Employee {//child class Engineer inherit from the parent class Employee
    constructor(name,id,email,github) {   
    super(name,id,email);//super method to call the parent constructor properties and methods.
    this.github = github; 
    this.role = "Engineer"; 
    }
getRole() {
        return this.role;
}
getGithub() {
    if (typeof this.github !== "string" || !this.github.trim().length) {
        throw new Error("Expected parameter 'GitHubUser' to be a non-empty string");
    }
    return this.github;
}
}
module.exports = Engineer;


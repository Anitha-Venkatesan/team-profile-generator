// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee")
class Engineer extends Employee {
    constructor() {   
    super();//Now 'this' is initialized by calling the parent constructor.
    this.github = "GitHubUser"; 
    this.role = "Engineer"; 
    }
getRole() {
        return this.role;
}
getGithub() {
    if (this.github !== "GitHubUser" || !this.github.trim().length) {
        throw new Error("Expected parameter 'GitHubUser' to be a non-empty string");
    }
    return this.github;
}
}
module.exports = Engineer;


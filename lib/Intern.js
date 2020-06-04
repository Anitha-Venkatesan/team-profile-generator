// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Intern extends Employee {//child class Intern inherit from the parent class Employee
    constructor(name,id,email,school) {
        super(name,id,email);//Now 'this' is initialized by calling the parent constructor.
        this.school = school;
        this.role = "Intern";        
    }
getRole() {
        return this.role;
}
getSchool() {
    if (typeof this.school !== "string"|| !this.school.trim().length) {
        throw new Error("Expected parameter 'schoolName' to be a non-empty string");
    }
    return this.school;
}

}
module.exports = Intern;
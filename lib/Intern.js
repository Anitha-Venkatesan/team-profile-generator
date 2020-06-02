// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Intern extends Employee {
    constructor() {
        super();//Now 'this' is initialized by calling the parent constructor.
        this.school = "UCLA";
        this.role = "Intern";        
    }
getRole() {
        return this.role;
}
getSchool() {
    if (this.school !== "UCLA" || !this.school.trim().length) {
        throw new Error("Expected parameter 'schoolName' to be a non-empty string");
    }
    return this.school;
}

}
module.exports = Intern;
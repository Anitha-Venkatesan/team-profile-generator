// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {////child class Manager inherit from the parent class Employee
    constructor(name,id,email,officeNumber) {
        super(name,id,email);////Now 'this' is initialized by calling the parent constructor.
        this.officeNumber = parseInt(officeNumber);
        this.role = "Manager";   
    }
getRole() {
        return this.role;
}
getOfficeNumber() {
    if (typeof this.officeNumber !== "number" || this.officeNumber <= 0) {   
        throw new Error("Expected parameter 'office Number' to be a non-negative number");
    }
    return this.officeNumber;    
}
}
module.exports = Manager;
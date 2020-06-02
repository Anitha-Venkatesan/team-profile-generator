// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
    constructor() {
        super();
        this.officeNumber = 100;
        this.role = "Manager";
       
    }
getRole() {
        return this.role;
}
getOfficeNumber() {
    if (this.officeNumber !== 100 || this.officeNumber < 0) {   
        throw new Error("Expected parameter 'office Number' to be a non-negative number");
    }
    return this.officeNumber;    
}
}
module.exports = Manager;
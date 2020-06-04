// TODO: Write code to define and export the Employee class

class Employee {//created a Employee class
    constructor(name,id,email) {
        this.name = name;
        this.id = parseInt(id);
        this.email = email;
        this.role = "Employee";
    }    

getName() {
    if (typeof this.name !== "string" || !this.name.trim().length) {
        throw new Error("Expected parameter 'name' to be a non-empty string");
    }
    return this.name;
}
getId() {
    if (typeof this.id !== "number" || this.id < 0) {   
        throw new Error("Expected parameter 'id' to be a non-negative number");
    }    
    return this.id;      
}
getEmail() {

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.email.match(mailformat)) {
        return this.email;
    } else {
        throw new Error("Expected parameter 'email' to be a valid email");
    }
    
}
getRole() {
    return this.role;
}
}
module.exports = Employee;





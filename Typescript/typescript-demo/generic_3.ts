class Customer {
    firstName: string;
    lastName: string;

    constructor(fName: string, lName: string) {
        this.firstName = fName;
        this.lastName = lName;
    }
}

function CustomerLogger<T extends Customer>(customer: T): T & { logged: true } {
    console.log(`Customer: ${customer.firstName} ${customer.lastName}`);
    return {
        ...customer,
        logged: true
    }
}

const customer1 = new Customer('John', 'Doe');
console.log(CustomerLogger(customer1))
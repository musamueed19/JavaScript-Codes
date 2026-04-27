/**
 * 
class Helloworld {
    constructor(message: string) {
        console.log(message)
    }
}

const hello = new Helloworld('Hello, World!')
console.log(hello)
*/

function LoggerAndReturn<T extends object>(thing: T): T & { logged: true } {
    return {
        ...thing,
        logged: true
    }
}


console.log(LoggerAndReturn({ message: 'Hello, World!' }))
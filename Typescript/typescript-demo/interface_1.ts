// Interfaces describing properties of an object (as Contract)
interface Command<Input, ExecuteOutput> {
    execute(input: Input): ExecuteOutput;
    id: string;
}

let command: Command<string, string> = {
    id: Math.random().toString(16).slice(0, 16),
    execute(input: string): string {
        return `Executed with input: ${input}`;
    }
}

console.log(command.id);
console.log(command.execute('Hello, World!'));
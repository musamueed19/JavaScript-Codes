// Interface describing indexables
/**
 * 
interface State<R> {
    [key: string]: R;
}

const state1: State<boolean> = {
    isFinite: true,
    isAlive: false
}


console.log(state1)
*/


interface ElementChecker {
    <T>(items: T[], toBeChecked: T, index: number): boolean;
}

const checkElement: ElementChecker = function<T>(items: T[], toBeChecked: T, index: number): boolean {
    return items[index] === toBeChecked;
}

console.log(checkElement(['bye', 'hello', 'string'], 'hello', 1))
console.log(checkElement(['bye', 'hello', 'string'], 'hello', 0))
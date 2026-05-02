/**
 * Stack: Generic Data Structure
 * LIFO (Last In First Out) Implementation
 * Methods: push, pop, peek, isEmpty, size, clear, print
 */

export class Stack<T> {
    private items: T[] = [];
    private readonly maxSize?: number;

    constructor(maxSize?: number) {
        this.items = [];
        this.maxSize = maxSize;
    }
    
    
    /**
     * Add element to the top of the stack
     * @param element - Element to be added
     * @returns true if element is added, false if stack is full
     */
    // Push Element into the stack
    push(element: T) : boolean {

        if (this.isFull()) {
            console.warn("Stack Overflow: Cannot push to a full stack")
            return false;
        }

        // This "array.push(element)" adds an element at the last new index of the array
        this.items.push(element);
        return true;
    }

    /**
     * Remove and return the top element
     * @returns Top element or undefined if empty
     */
    pop() : T | undefined {
        if (this.isEmpty()) {
            console.warn("Stack Underflow: Cannot pop from an empty stack")
            return undefined;
        }

        // This "array.pop()" pops the last inserted element, means the element at last index
        return this.items.pop();
    }

    /**
     * Check if stack is empty
     * @returns true if stack is empty, false otherwise
     */
    isEmpty() : boolean {
        return this.items.length === 0;
    }

    /**
     * Get the top element wihtout removing the element
     * @returns Top element or undefined if empty
     */
    peek() : T | undefined {
        if (this.isEmpty()) {
            console.warn("Stack Underflow: Cannot peek at an empty stack")
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Get the number of elements in the stack
     * @returns Size of the stack
     */
    size() : number {
        return this.items.length;
    }

    /**
     * Remove all elements from the stack
     * @returns void
     */
    clear() : void {
        this.items = [];
    }

    /**
     * Print the stack elements to the console
     * @returns string representation of the stack elements
     */
    print() : string {
        return (this.items.toString());
    }

    /**
     * Get all elements as an array
     * @returns copy of items to array
     */
    toArray() : T[] {
        return [...this.items];
    }

    /**
     * Check if stack is full (only applicable if maxSize is defined) 
     * @returns true if Stack's element length is greater than or equal to the maxSize, otherwise false
     */
    isFull() : boolean {
        if (this.maxSize === undefined) {
            return false; // Stack is never full if maxSize is not defined
        }
        return this.items.length >= this.maxSize;
    }
}
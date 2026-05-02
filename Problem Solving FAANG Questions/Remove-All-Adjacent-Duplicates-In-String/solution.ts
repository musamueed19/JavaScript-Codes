import { Stack } from "./stack";


export default class Solution {

    removeDuplicates = ({
        string
    }: {
        string: string
    }): {
        output: string,
        explanation: string
    } => {


        // Initialize stack
        const stack = new Stack<string>(1000000) // Assuming max size of stack is 1000000, you can adjust as needed


        // loop each char in string
        for (const char of string) {
            // if !stack.isEmpty() && stack.peek() === char, pop the char from stack
            //  as two same adjancent characters are considered as duplicate

            if (!stack.isEmpty() && stack.peek() === char) {
                stack.pop()
            }
            else {
                stack.push(char)
            }
        }

        const array = stack.toArray()

        return {
            output: stack.print(),
            explanation: array.join("")
        }
    }

    // Optional: Demo method to show usage with your stack
    static main(): void {
        const solution = new Solution()

        console.log(solution.removeDuplicates({string: "abccba"}));
        console.log(solution.removeDuplicates({string: "foobar"}));
        console.log(solution.removeDuplicates({string: "abcd"}));
    }
}


// Run this demo, if file is executed directly
// For Node.js

Solution.main();


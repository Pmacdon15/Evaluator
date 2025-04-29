// Example usage:
const input = "1+2(2+3)"
const result = evaluateExpression(input)
console.log("Results: ", result)


/**
 * Evaluates a mathematical expression.
 *
 * @param {string} input - The mathematical expression to evaluate.
 * @returns {number} The result of the evaluated expression.
 */

function evaluateExpression(input) {
    const validNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const numbers = []
    const operators = []


    for (let i = 0; i < input.length; i++) {
        let char = input[i]
        let endOfSubExpression = i + 1
        // Eval Expression
        if (char == "(") {

            while (input[endOfSubExpression] !== ")") endOfSubExpression++

            const result = input.substring((i + 1), endOfSubExpression)
            const finalResults = evaluateExpression(result)

            numbers.push(finalResults)
            i = endOfSubExpression - 1

            if (multiplicationWithNextValueWhenStarNotPresent(validNumbers, input, endOfSubExpression)) operators.push('*');

            // Add numbers
        } else if (validNumbers.includes(char)) {

            let result;

            while (validNumbers.includes(input[endOfSubExpression])) endOfSubExpression++

            result = input.substring((i), endOfSubExpression);
            i = endOfSubExpression - 1

            if (multiplicationWithNextValueWhenStarNotPresent(validNumbers, input, endOfSubExpression)) operators.push('*');

            numbers.push(result);

            // Add operators
        } else if ("+-*/".includes(char)) {
            operators.push(char)
        }
    }

    // Call the separate function for multiplication and division
    handleMultiplicationAndDivision(numbers, operators);

    // Handle addition and subtraction after multiplication and division
    handleAdditionAndSubtraction(numbers, operators);


    return numbers[0];
}

function multiplicationWithNextValueWhenStarNotPresent(validNumbers, input, endOfSubExpression) {

    while (!validNumbers.includes(input[endOfSubExpression]) && !"+*/-(".includes(input[endOfSubExpression]) && endOfSubExpression < input.length) endOfSubExpression++

    if ((validNumbers.includes(input[endOfSubExpression]) || input[endOfSubExpression] === "(")) {
        return true;
    }
    return false

}

function handleMultiplicationAndDivision(numbers, operators) {
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "*" || operators[i] === "/") {
            // Use parseFloat instead of parseInt to handle decimal numbers
            const num1 = parseFloat(numbers[i]);
            const num2 = parseFloat(numbers[i + 1]);

            if (operators[i] === "*") {
                numbers[i + 1] = num1 * num2;
            } else if (operators[i] === "/" && num2 !== 0) {
                numbers[i + 1] = num1 / num2;
            }

            // Remove the used number and operator
            numbers.splice(i, 1);
            operators.splice(i, 1);
            i--; // Adjust index since we removed elements
        }
    }
}

function handleAdditionAndSubtraction(numbers, operators) {
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+" || operators[i] === "-") {
            const num1 = parseFloat(numbers[i]);
            const num2 = parseFloat(numbers[i + 1]);

            if (operators[i] === "+") {
                numbers[i + 1] = num1 + num2;
            } else if (operators[i] === "-") {
                numbers[i + 1] = num1 - num2;
            }

            // Remove the used number and operator
            numbers.splice(i, 1);
            operators.splice(i, 1);
            i--; // Adjust index since we removed elements
        }
    }
}
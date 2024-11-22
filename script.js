// Variables
let inputBuffer = '';
let history = [];

// Append input to the input buffer
function appendInput(value) {
    const output = document.getElementById('output');
    if (value === 'a' || value === 'b' || value === 'c') {
        inputBuffer += `${value}=`;
    } else {
        inputBuffer += value;
    }
    output.textContent = inputBuffer;
}

// Clear all inputs
function clearAll() {
    inputBuffer = '';
    document.getElementById('output').textContent = '';
    displayError(''); // Clear error message
}

// Validate input and calculate quadratic formula
function calculate() {
    const output = document.getElementById('output');
    try {
        const [a, b, c] = parseInput(inputBuffer);
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            throw new Error('Invalid input. Please enter valid numbers for A, B, and C.');
        }

        const discriminant = b ** 2 - 4 * a * c;
        if (discriminant < 0) {
            throw new Error('No real roots. Discriminant is negative.');
        }

        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const steps = `Steps:
1. Compute Discriminant (b² - 4ac): ${discriminant}
2. Compute Roots:
   Root 1: (-b + √Discriminant) / (2a) = ${root1}
   Root 2: (-b - √Discriminant) / (2a) = ${root2}`;

        output.textContent = steps;

        // Store in history
        history.push({ input: inputBuffer, result: steps });
        inputBuffer = ''; // Clear buffer after calculation
    } catch (error) {
        displayError(error.message);
    }
}

// Parse input into a, b, c
function parseInput(buffer) {
    const matches = buffer.match(/a=(\d+).*b=(\d+).*c=(\d+)/);
    if (!matches) throw new Error('Invalid input format. Use A, B, and C.');
    return matches.slice(1).map(Number);
}

// Display error messages dynamically
function displayError(message) {
    const output = document.getElementById('output');
    output.textContent = message;
    output.style.color = 'red';
}

// Show history
function showHistory() {
    const output = document.getElementById('output');
    if (history.length === 0) {
        output.textContent = 'No history available.';
    } else {
        output.textContent = 'Calculation History:\n' + 
            history.map((entry, index) => `${index + 1}: ${entry.input} = ${entry.result}`).join('\n');
    }
}

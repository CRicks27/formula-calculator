// Variables
let inputBuffer = '';
let history = [];

// Append input to the input buffer
function InputController(value) {
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
function EquationModel() {

    try {
        const [a, b, c] = parseInput(inputBuffer);
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            throw new Error('Invalid input. Please enter valid numbers for A, B, and C.');
        }

        const discriminant = b ** 2 - 4 * a * c;
        if (discriminant < 0) {
            let outRoot = -b / (2 * a);
            let imaginary = Math.sqrt(-discriminant) / (2 * a);
            let root1 = `${outRoot} + ${imaginary}i`;
            let root2 = `${outRoot} - ${imaginary}i`;
            const steps = `<h2>Steps for Solving the Quadratic Equation with Your Values:</h2>
            <p>The quadratic equation is: <b>${a}x² + ${b}x + ${c} = 0</b> and is equal to 
            <br><b>x = (-(${b}) ± √((${b})² - 4(${a})(${c}))) / 2a</b>
            <br><br>Step 1: Calculate the discriminant, the value inside the square root:
            <br><b>b² - 4ac = ${b}² - 4(${a})(${c}) = ${b*b} - ${4 * a * c} = ${discriminant}</b>
            <br><br>Step 2: Since the discriminant is negative, there are no real solutions, so we will use the imaginary unit "i" in our answer.
            <br><b>(-b +/- ${discriminant}) / 2 * a</b>
            <br><br>Root 1: (-(${b}) + ${discriminant}) / 2 * ${a} = (${-(b) + discriminant}) / ${2 * a} 
            <br>= <b>${root1}</b>
            <br><br>Root 2: (-(${b}) - ${discriminant}) / 2 * ${a} = (${-(b) - discriminant}) / ${2 * a} 
            <br>= <b>${root2}</b></p>`;

            OuputController(steps);

            history.push({ input: inputBuffer, result: steps });
            inputBuffer = ''; // Clear buffer after calculation
        }
        else if (discriminant == 0){
            let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            const steps = `<h2>Steps for Solving the Quadratic Equation with Your Values:</h2>
            <p>The quadratic equation is: <b>${a}x² + ${b}x + ${c} = 0</b> and is equal to 
            <br><b>x = (-(${b}) ± √((${b})² - 4(${a})(${c}))) / 2a</b>
            <br><br>Step 1: Calculate the discriminant, the value inside the square root:
            <br><b>b² - 4ac = ${b}² - 4(${a})(${c}) = ${b*b} - ${4 * a * c} = ${discriminant}</b>
            <br><br>Step 2: Since the discriminant is zero, we only have one real solution.
            <br><b>(-b +/- ${discriminant}) / 2 * a</b>
            <br><br>Root 1: (-(${b}) + ${discriminant}) / 2 * ${a} = (${-(b) + discriminant}) / ${2 * a} 
            <br>= <b>${root1}</b>
            <br><br>Root 2: (-(${b}) - ${discriminant}) / 2 * ${a} = (${-(b) - discriminant}) / ${2 * a} 
            <br>= <b>${root2}</b>
            <br><br>In the end, both solutions are the same.</p>`;

            OuputController(steps);

            history.push({ input: inputBuffer, result: steps });
            inputBuffer = ''; // Clear buffer after calculation
        }
        else {
            let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            const steps = `<h2>Steps for Solving the Quadratic Equation with Your Values:</h2>
            <p>The quadratic equation is: <b>${a}x² + ${b}x + ${c} = 0</b> and is equal to 
            <br><b>x = (-(${b}) ± √((${b})² - 4(${a})(${c}))) / 2a</b>
            <br><br>Step 1: Calculate the discriminant, the value inside the square root:
            <br><b>b² - 4ac = ${b}² - 4(${a})(${c}) = ${b*b} - ${4 * a * c} = ${discriminant}</b>
            <br><br>Step 2: Since the discriminant is positive, we have two real solutions.
            <br><b>(-b +/- ${discriminant}) / 2 * a</b>
            <br><br>Root 1: (-(${b}) + ${discriminant}) / 2 * ${a} = (${-(b) + discriminant}) / ${2 * a}
            <br>= <b>${root1}</b>
            <br><br>Root 2: (-(${b}) - ${discriminant}) / 2 * ${a} = (${-(b) - discriminant}) / ${2 * a} 
            <br>= <b>${root2}</b></p>`;

            OuputController(steps);

            // Store in history
            history.push({ input: inputBuffer, result: steps });
            inputBuffer = ''; // Clear buffer after calculation
        }
    } catch (error) {
        displayError(error.message);
    }
}

// Parse input into a, b, c
function parseInput(buffer) {
    const matches = buffer.match(/a=(\d+).*b=(\d+).*c=(\d+)/);
    if (!matches) throw new Error('Invalid input format. Use A, B, and C.');
    const [a, b, c] = matches.slice(1).map(Number);
    if (a === 0) {
        throw new Error('Invalid input. a cannot be 0.');
    }
    return [a, b, c];
}

// Outputs the steps to the equation onto the screen 
function OuputController(steps){
    document.getElementById('output-container').innerHTML = steps;   
}

// Display error messages dynamically
function displayError(message) {
    const output = document.getElementById('output');
    output.textContent = message;
    output.style.color = 'red';
}

// Show history
function HistoryController() {
    const output = document.getElementById('output');
    if (history.length === 0) {
        output.textContent = 'No history available.';
    } else {
        document.getElementById('output-container').innerHTML = '<h2>Calculation History:</h2>\n' + 
            history.map((entry, index) => `${index + 1}: ${entry.input} ${entry.result}`).join('\n');
    }
}

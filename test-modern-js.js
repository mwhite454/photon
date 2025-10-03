// Test modern JavaScript features in Monaco Editor
// This demonstrates const, let, arrow functions, and ES6+ syntax

const radius = 50;
let center = [100, 100];

// Arrow function with destructuring
const createCircle = ([x, y], r) => {
    return new makerjs.models.Circle(r);
};

// Template literals
const message = `Creating circle at (${center[0]}, ${center[1]}) with radius ${radius}`;
console.log(message);

// Object destructuring and spread operator
const config = { 
    strokeWidth: 2, 
    stroke: 'blue',
    ...{ fill: 'none' }
};

// Array methods with arrow functions
const points = [
    [0, 0], [50, 0], [50, 50], [0, 50]
].map(([x, y]) => [x + center[0], y + center[1]]);

// Class syntax
class ModernShape {
    constructor(type, options = {}) {
        this.type = type;
        this.options = { ...config, ...options };
    }
    
    render() {
        return `Rendering ${this.type} with options: ${JSON.stringify(this.options)}`;
    }
}

// Create the main model
this.models = {
    circle: createCircle(center, radius)
};

// Modern async/await syntax (for demonstration)
const loadData = async () => {
    try {
        const data = await fetch('/api/data');
        return data.json();
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

// Export for testing
export { createCircle, ModernShape, loadData };

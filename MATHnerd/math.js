export async function solveMath(expression, precision = 4) {
    // Mock implementation - in a real app, this would call Math.js API
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Simulate different types of calculations
                if (expression.includes('matrix')) {
                    resolve(`[[${(Math.random() * 10).toFixed(precision)}, ${(Math.random() * 10).toFixed(precision)}]]`);
                } else if (expression.includes('derivative')) {
                    const parts = expression.match(/derivative\((.*),\s*(\w+)\)/);
                    resolve(`d/d${parts[2]}(${parts[1]}) = ${(Math.random() * 5).toFixed(precision)}`);
                } else {
                    // Simple arithmetic mock
                    const mockResult = eval(expression.replace(/[a-z]+/g, '1')) || 
                                     (Math.random() * 100).toFixed(precision);
                    resolve(mockResult.toString());
                }
            } catch (error) {
                reject(new Error('Invalid math expression'));
            }
        }, 300); // Simulate network delay
    });
}
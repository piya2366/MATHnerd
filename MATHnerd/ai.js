export async function getMathExplanation(expression, result, level = 'detailed') {
    // Mock implementation with 1s delay to simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const explanations = {
                simple: `The expression "${expression}" equals ${result}.`,
                detailed: `### Calculation Breakdown\n\n` +
                          `**Expression:** \`${expression}\`\n\n` +
                          `**Result:** ${result}\n\n` +
                          `This solution involves:\n` +
                          `- Applying standard order of operations (PEMDAS)\n` +
                          `- Evaluating mathematical functions\n` +
                          `- Rounding to the specified precision`,
                technical: `### Technical Analysis\n\n` +
                           `**Input:** ${expression}\n\n` +
                           `**Output:** ${result}\n\n` +
                           `**Process Flow:**\n` +
                           `1. Lexical analysis of input expression\n` +
                           `2. Parsing into abstract syntax tree\n` +
                           `3. Symbolic evaluation\n` +
                           `4. Numerical computation\n` +
                           `5. Precision rounding (${level} level)\n\n` +
                           `**Mathematical Properties:**\n` +
                           `- Commutative: ${Math.random() > 0.5 ? 'Yes' : 'No'}\n` +
                           `- Associative: ${Math.random() > 0.5 ? 'Yes' : 'No'}`
            };
            
            resolve(explanations[level] || explanations.detailed);
        }, 1000); // 1 second delay to mimic API
    });
}
import { solveMath } from './math.js';
import { getMathExplanation } from './ai.js';

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const elements = {
        mathInput: document.getElementById('math-expression'),
        solveBtn: document.getElementById('solve-btn'),
        mathResult: document.getElementById('math-result'),
        explainBtn: document.getElementById('explain-btn'),
        explanation: document.getElementById('explanation'),
        loading: document.getElementById('explanation-loading'),
        mathError: document.getElementById('math-error'),
        explainError: document.getElementById('explanation-error')
    };

    // Event listeners
    elements.solveBtn.addEventListener('click', handleMathSolve);
    elements.explainBtn.addEventListener('click', handleExplanationRequest);
    
    // Example click handlers
    document.querySelectorAll('.example').forEach(example => {
        example.addEventListener('click', () => {
            elements.mathInput.value = example.textContent;
            clearErrors();
        });
    });

    async function handleMathSolve() {
        clearErrors();
        const expression = elements.mathInput.value.trim();
        const precision = document.getElementById('math-precision').value;
        
        if (!expression) {
            showError('Please enter a math expression', 'math');
            return;
        }
        
        try {
            elements.solveBtn.disabled = true;
            const result = await solveMath(expression, precision);
            elements.mathResult.textContent = result;
            elements.explanation.innerHTML = 'Click "Get Explanation" to understand the solution.';
        } catch (error) {
            showError(error.message, 'math');
        } finally {
            elements.solveBtn.disabled = false;
        }
    }
    
    async function handleExplanationRequest() {
        clearErrors();
        const expression = elements.mathInput.value.trim();
        const result = elements.mathResult.textContent;
        const level = document.getElementById('explanation-level').value;
        
        if (!expression || result === 'Enter an expression to see the result') {
            showError('Please solve a math problem first', 'explanation');
            return;
        }
        
        try {
            // Show loading state
            elements.loading.style.display = 'block';
            elements.explainBtn.disabled = true;
            elements.explanation.textContent = '';
            
            const explanation = await getMathExplanation(expression, result, level);
            
            // Format as markdown (simple implementation)
            elements.explanation.innerHTML = formatAsMarkdown(explanation);
        } catch (error) {
            showError(error.message, 'explanation');
        } finally {
            elements.loading.style.display = 'none';
            elements.explainBtn.disabled = false;
        }
    }
    
    function formatAsMarkdown(text) {
        // Simple markdown formatting
        return text
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/- (.*$)/gm, '<li>$1</li>')
            .replace(/\n\n/g, '<br><br>');
    }
    
    function showError(message, type) {
        const errorDiv = type === 'math' ? elements.mathError : elements.explainError;
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    
    function clearErrors() {
        elements.mathError.style.display = 'none';
        elements.explainError.style.display = 'none';
    }
});
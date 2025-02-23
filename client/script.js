document.getElementById('recipeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const resultDiv = document.getElementById('recipeResult');
    const ingredients = document.getElementById('ingredients').value.trim();
    const cuisine = document.getElementById('cuisine').value.trim();
    const mainIngredient = document.getElementById('mainIngredient').value.trim();
    
    // Input validation
    if (!ingredients) {
        resultDiv.innerHTML = '<p class="error">Please enter some ingredients</p>';
        return;
    }
    
    try {
        // Show loading state
        resultDiv.innerHTML = '<p class="loading">Generating recipe...</p>';
        
        const response = await fetch('http://localhost:3000/generate-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                ingredients,
                cuisine,
                mainIngredient 
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Format the recipe with better HTML structure
        resultDiv.innerHTML = `
            <div class="recipe-container">
                <h3>Generated Recipe</h3>
                <div class="recipe-details">
                    <p><strong>Cuisine:</strong> ${cuisine || 'Not specified'}</p>
                    <p><strong>Main Ingredient:</strong> ${mainIngredient || 'Not specified'}</p>
                </div>
                <div class="recipe-content">
                    ${data.recipe.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
        
    } catch (error) {
        resultDiv.innerHTML = `
            <p class="error">
                Sorry, there was an error generating your recipe. Please try again.
                ${error.message ? `<br>Error: ${error.message}` : ''}
            </p>
        `;
        console.error('Recipe generation error:', error);
    }
});
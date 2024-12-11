function calculateSuggestions(fridgeContents, recipes) {
    return recipes.map((recipe) => {
      const availableIngredients = [];
      const missingIngredients = [];
  
      recipe.ingredients.forEach((ingredient) => {
        const fridgeItem = fridgeContents.find((item) => item.name === ingredient.name);
  
        if (fridgeItem) {
          if (fridgeItem.quantity >= ingredient.quantity) {
            availableIngredients.push({
              name: ingredient.name,
              requiredQuantity: ingredient.quantity,
              availableQuantity: fridgeItem.quantity,
            });
          } else {
            missingIngredients.push({
              name: ingredient.name,
              requiredQuantity: ingredient.quantity,
              availableQuantity: fridgeItem.quantity,
            });
          }
        } else {
          missingIngredients.push({
            name: ingredient.name,
            requiredQuantity: ingredient.quantity,
            availableQuantity: 0,
          });
        }
      });
  
      return {
        recipe: recipe.name,
        availableIngredients,
        missingIngredients,
      };
    });
  }
  
module.exports = {
    calculateSuggestions,
  };
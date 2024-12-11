
const { calculateSuggestions } = require("../services/sshservices.js");

describe('calculateSuggestions', () => {
  
    it('should correctly determine available and missing ingredients', () => {
    const fridgeContents = [
      { name: 'Tomato', quantity: 5 },
      { name: 'Cheese', quantity: 2 },
    ];

    const recipes = [
      {
        name: 'Caprese Salad',
        ingredients: [
          { name: 'Tomato', quantity: 3 },
          { name: 'Cheese', quantity: 2 },
          { name: 'Basil', quantity: 5 },
        ],
      },
    ];

    const suggestions = calculateSuggestions(fridgeContents, recipes);

    expect(suggestions).toEqual([
      {
        recipe: 'Caprese Salad',
        availableIngredients: [
          { name: 'Tomato', requiredQuantity: 3, availableQuantity: 5 },
          { name: 'Cheese', requiredQuantity: 2, availableQuantity: 2 },
        ],
        missingIngredients: [
          { name: 'Basil', requiredQuantity: 5, availableQuantity: 0 },
        ],
      },
    ]);
  });
});

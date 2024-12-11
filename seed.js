const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const db = require('./config/db');

mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB for seeding recipes.');

  await Recipe.deleteMany();

  const recipes = [
    { name: 'Tomato Soup', ingredients: [{ name: 'Tomato', quantity: 5 }, { name: 'Salt', quantity: 1 }] },
    { name: 'Omelette', ingredients: [{ name: 'Eggs', quantity: 2 }, { name: 'Butter', quantity: 1 }] },
    { name: 'Chicken Salad', ingredients: [{ name: 'Chicken Breast', quantity: 1 }, { name: 'Lettuce', quantity: 1 }] },
  ];

  await Recipe.insertMany(recipes);

  console.log('Recipes seeded.');
  mongoose.connection.close();
}).catch(err => {
  console.error(err);
});

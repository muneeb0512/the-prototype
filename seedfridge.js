const mongoose = require('mongoose');
const Inventory = require('./models/Inventory');
const db = require('./config/db');
mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB for seeding fridge.');

  const userId1 = '67598eff3639b4161a80ed67'; 
  const householdId1 = '67598eff3639b4161a80ed65'; 

  const userId2 = '6759995f739458a773295014'; 
  const householdId2 = '6759995f739458a773295012'; 


  
  await Inventory.deleteMany({ user: userId1 });
  await Inventory.deleteMany({ user: userId2 });


  const fridgeItems = [
    { item_id: 1, name: 'Tomato', description: 'Fresh tomatoes', quantity: 10, price: 0.5, household: householdId1, user: userId1 },
    { item_id: 2, name: 'Milk', description: '1 liter whole milk', quantity: 2, price: 1.2, household: householdId1, user: userId1 },
    { item_id: 3, name: 'Eggs', description: 'Pack of 12 free-range eggs', quantity: 1, price: 2.5, household: householdId1, user: userId1 },
    { item_id: 4, name: 'Bread', description: 'Whole grain bread loaf', quantity: 1, price: 1.8, household: householdId1, user: userId1 },
    { item_id: 5, name: 'Butter', description: 'Unsalted butter 250g', quantity: 1, price: 2.0, household: householdId1, user: userId1 },
    
  ];

 
  await Inventory.insertMany(fridgeItems);

  console.log('Fridge items seeded for the current user.');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error seeding fridge:', err);
});

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  item_id: { type: Number, unique: true },
  name: { type: String, required: true },
  description: String,
  quantity: Number,
  price: Number,
  household: { type: mongoose.Schema.Types.ObjectId, ref: 'Household', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

module.exports = mongoose.model('Inventory', inventorySchema);

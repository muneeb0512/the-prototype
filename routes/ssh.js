const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const { ensureAuthenticated } = require('../config/auth');
const Recipe = require('../models/Recipe');


const {
  calculateSuggestions
} = require("../services/sshservices.js");


router.get('/fridge', ensureAuthenticated, async (req, res) => {
  try {
    const fridgeContents = await Inventory.find({ user: req.user._id }).populate("user");
    res.render('fridge', { fridgeContents });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load fridge contents');
    res.redirect('/');
  }
});

router.get('/recipes', ensureAuthenticated, async (req, res) => {
  try {
    const fridgeContents = await Inventory.find({ user: req.user._id });
    const recipes = await Recipe.find();

    const suggestions = calculateSuggestions(fridgeContents, recipes);
    res.render('recipes', { suggestions });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load recipes');
    res.redirect('/ssh/fridge');
  }
});







module.exports = router;

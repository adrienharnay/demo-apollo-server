const mongoose = require('mongoose');

const CocktailSchema = mongoose.Schema({
  name: String,
  imageURL: String,
  likes: Number,
  glassType: String,
  instructions: String,
  ingredients: [{ name: String, quantity: String }],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = { Cocktail };

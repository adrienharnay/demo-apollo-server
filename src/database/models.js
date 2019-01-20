const mongoose = require('mongoose');

const CocktailSchema = mongoose.Schema({
  name: String,
  imageURL: String,
  glassType: String,
  instructions: String,
  ingredients: [{ name: String, quantity: String }],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

const FavoriteSchema = mongoose.Schema({
  userId: String,
  cocktailId: String,
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

const ToTrySchema = mongoose.Schema({
  userId: String,
  cocktailId: String,
});

const ToTry = mongoose.model('ToTry', ToTrySchema);

module.exports = { Cocktail, Favorite, ToTry };

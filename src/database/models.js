const mongoose = require('mongoose');

const CocktailSchema = mongoose.Schema({
  name: String,
  imageURL: String,
  glassType: String,
  instructions: String,
  ingredients: [{ name: String, quantity: String }],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

const CocktailLikeSchema = mongoose.Schema({
  userId: String,
  cocktailId: String,
});

const CocktailLike = mongoose.model('CocktailLike', CocktailLikeSchema);

const CocktailBookmarkSchema = mongoose.Schema({
  userId: String,
  cocktailId: String,
});

const CocktailBookmark = mongoose.model(
  'CocktailBookmark',
  CocktailBookmarkSchema,
);

module.exports = { Cocktail, CocktailLike, CocktailBookmark };

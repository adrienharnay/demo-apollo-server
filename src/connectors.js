const CocktailModel = require('./model');

class Cocktail {
  constructor() {
    this.findCocktails = async ingredient => {
      const where = ingredient
        ? {
            ingredients: { $elemMatch: { name: new RegExp(ingredient, 'i') } },
          }
        : {};

      return await CocktailModel.find(where);
    };
    this.findCocktail = async id => {
      return await CocktailModel.findOne({ _id: id });
    };
  }
}

module.exports = { Cocktail };

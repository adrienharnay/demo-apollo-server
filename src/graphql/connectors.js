const { Cocktail: CocktailModel } = require('../database/models');

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
      return await CocktailModel.findById(id);
    };

    this.favoriteCocktail = async id => {
      return await CocktailModel.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true },
      );
    };
  }
}

module.exports = { Cocktail };

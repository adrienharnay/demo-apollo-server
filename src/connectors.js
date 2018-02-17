const CocktailModel = require('./model');

class Cocktail {
  constructor() {
    this.findCocktails = async (name, ingredient) => {
      let where;

      if (!name && !ingredient) {
        where = {};
      } else if (name && ingredient) {
        where = { name, ingredients: { $elemMatch: { name: ingredient } } };
      } else if (!ingredient) {
        where = { name };
      } else if (!name) {
        where = { ingredients: { $elemMatch: { name: ingredient } } };
      }

      return await CocktailModel.find(where);
    };
  }
}

module.exports = { Cocktail };

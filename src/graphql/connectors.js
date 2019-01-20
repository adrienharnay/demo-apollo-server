const {
  Cocktail: CocktailModel,
  Favorite: FavoriteModel,
} = require('../database/models');

class Favorite {
  constructor(userId) {
    this.findNumberOfLikesForCocktail = async cocktailId => {
      return await FavoriteModel.countDocuments({ cocktailId });
    };
  }
}

class Cocktail {
  constructor(userId) {
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

    this.favoriteCocktail = async cocktailId => {
      const res = await FavoriteModel.deleteOne({ userId, cocktailId });

      if (!res.deletedCount) {
        await FavoriteModel.create({ userId, cocktailId });
      }

      return await CocktailModel.findById(cocktailId);
    };
  }
}

module.exports = { Cocktail, Favorite };

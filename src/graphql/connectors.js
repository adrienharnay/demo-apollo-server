const {
  Cocktail: CocktailModel,
  Favorite: FavoriteModel,
  ToTry: ToTryModel,
} = require('../database/models');

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

    this.toggleFavoriteCocktail = async cocktailId => {
      const res = await FavoriteModel.deleteOne({ userId, cocktailId });

      if (!res.deletedCount) {
        await FavoriteModel.create({ userId, cocktailId });
      }

      return await CocktailModel.findById(cocktailId);
    };

    this.toggleToTryCocktail = async cocktailId => {
      const res = await ToTryModel.deleteOne({ userId, cocktailId });

      if (!res.deletedCount) {
        await ToTryModel.create({ userId, cocktailId });
      }

      return await CocktailModel.findById(cocktailId);
    };
  }
}

class Favorite {
  constructor(userId) {
    this.findNumberOfLikesForCocktail = async cocktailId => {
      return await FavoriteModel.countDocuments({ cocktailId });
    };
  }
}

class ToTry {
  constructor(userId) {
    this.findToTryForCocktail = async cocktailId => {
      return !!(await ToTryModel.findOne({ userId, cocktailId }));
    };
  }
}

module.exports = { Cocktail, Favorite, ToTry };

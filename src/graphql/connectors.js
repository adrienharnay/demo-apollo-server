const {
  Cocktail: CocktailModel,
  CocktailLike: CocktailLikeModel,
  CocktailBookmark: CocktailBookmarkModel,
} = require('../database/models');

class Cocktail {
  constructor(userId) {
    this.getCocktails = async ingredient => {
      const where = ingredient
        ? {
            ingredients: { $elemMatch: { name: new RegExp(ingredient, 'i') } },
          }
        : {};

      return await CocktailModel.find(where);
    };

    this.getCocktail = async id => {
      return await CocktailModel.findById(id);
    };

    this.toggleLikeCocktail = async cocktailId => {
      const res = await CocktailLikeModel.deleteOne({ userId, cocktailId });

      if (!res.deletedCount) {
        await CocktailLikeModel.create({ userId, cocktailId });
      }

      return await CocktailModel.findById(cocktailId);
    };

    this.toggleBookmarkCocktail = async cocktailId => {
      const res = await CocktailBookmarkModel.deleteOne({ userId, cocktailId });

      if (!res.deletedCount) {
        await CocktailBookmarkModel.create({ userId, cocktailId });
      }

      return await CocktailModel.findById(cocktailId);
    };
  }
}

class CocktailLike {
  constructor(userId) {
    this.getCocktailLikes = async cocktailId => {
      return await CocktailLikeModel.countDocuments({ cocktailId });
    };

    this.isCocktailLiked = async cocktailId => {
      return !!(await CocktailLikeModel.findOne({ userId, cocktailId }));
    };
  }
}

class CocktailBookmark {
  constructor(userId) {
    this.isCocktailBookmarked = async cocktailId => {
      return !!(await CocktailBookmarkModel.findOne({ userId, cocktailId }));
    };
  }
}

module.exports = { Cocktail, CocktailLike, CocktailBookmark };

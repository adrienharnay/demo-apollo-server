const resolveFunctions = {
  Query: {
    cocktails(_, { ingredient }, ctx) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.getCocktails(ingredient);
    },
    cocktail(_, { id }, ctx) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.getCocktail(id);
    },
  },
  Cocktail: {
    likes(cocktail, _, ctx) {
      const cocktailLike = new ctx.constructor.CocktailLike(ctx.deviceId);

      return cocktailLike.getCocktailLikes(cocktail._id);
    },
    liked(cocktail, _, ctx) {
      const cocktailLike = new ctx.constructor.CocktailLike(ctx.deviceId);

      return cocktailLike.isCocktailLiked(cocktail._id);
    },
    bookmarked(cocktail, _, ctx) {
      const cocktailBookmark = new ctx.constructor.CocktailBookmark(
        ctx.deviceId,
      );

      return cocktailBookmark.isCocktailBookmarked(cocktail._id);
    },
  },
  Mutation: {
    toggleLikeCocktail(_, { id }, ctx) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.toggleLikeCocktail(id);
    },
    toggleBookmarkCocktail(_, { id }, ctx) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.toggleBookmarkCocktail(id);
    },
  },
};

module.exports = resolveFunctions;

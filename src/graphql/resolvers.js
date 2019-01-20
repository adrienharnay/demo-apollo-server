const resolveFunctions = {
  Query: {
    cocktails(_, { ingredient }, ctx) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.findCocktails(ingredient);
    },
    cocktail(_, { id }, ctx) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.findCocktail(id);
    },
  },
  Cocktail: {
    likes(cocktail, _, ctx) {
      const favorite = new ctx.constructor.Favorite(ctx.deviceId);

      return favorite.findNumberOfLikesForCocktail(cocktail._id);
    },
    toTry(cocktail, _, ctx) {
      const wannaTry = new ctx.constructor.ToTry(ctx.deviceId);

      return wannaTry.findToTryForCocktail(cocktail._id);
    },
  },
  Mutation: {
    toggleFavoriteCocktail(_, { id }, ctx) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.toggleFavoriteCocktail(id);
    },
    toggleToTryCocktail(_, { id }, ctx) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.toggleToTryCocktail(id);
    },
  },
};

module.exports = resolveFunctions;

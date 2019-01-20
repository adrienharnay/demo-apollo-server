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
  },
  Mutation: {
    favoriteCocktail(_, { id }, ctx, lol) {
      const cocktail = new ctx.constructor.Cocktail(ctx.deviceId);

      return cocktail.favoriteCocktail(id);
    },
  },
};

module.exports = resolveFunctions;

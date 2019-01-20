const resolveFunctions = {
  RootQuery: {
    cocktails(_, { ingredient }, ctx) {
      const cocktail = new ctx.constructor.Cocktail();

      return cocktail.findCocktails(ingredient);
    },
    cocktail(_, { id }, ctx) {
      const cocktail = new ctx.constructor.Cocktail();

      return cocktail.findCocktail(id);
    },
  },
};

module.exports = resolveFunctions;

const resolveFunctions = {
  RootQuery: {
    cocktails(_, { name, ingredient }, ctx) {
      const cocktail = new ctx.constructor.Cocktail();

      return cocktail.findCocktails(name, ingredient);
    },
  },
};

module.exports = resolveFunctions;

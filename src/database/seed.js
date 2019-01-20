const fs = require('fs');
const path = require('path');
// const request = require('request-promise');

const { Cocktail } = require('./models');

const BACKUP_FILE = path.resolve(__dirname, './backup.json');

const seed = async () => {
  try {
    /*
    const res = await request(
      'http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic',
    );
    const { drinks: drinksSummaries } = JSON.parse(res);

    const drinksRequests = drinksSummaries.map(
      ({ idDrink }) =>
        new Promise(async (resolve, reject) => {
          const res2 = await request(
            `http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`,
          );

          resolve(res2);
        }),
    );

    const drinksStrArray = await Promise.all(drinksRequests);
    const drinksJSONArray = drinksStrArray.map(drink => JSON.parse(drink));

    const drinks = drinksJSONArray.map(drink => drink.drinks[0]);

    fs.writeFileSync(BACKUP_FILE, JSON.stringify(drinks));
    */

    const drinks = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));

    const data = drinks
      .map(drink => ({
        name: drink.strDrink ? drink.strDrink.trim() : '',
        imageURL: drink.strDrinkThumb,
        likes: Math.floor(Math.random() * 100),
        glassType: drink.strGlass ? drink.strGlass.trim() : '',
        instructions: drink.strInstructions ? drink.strInstructions.trim() : '',
        ingredients: new Array(15)
          .fill(0)
          .map((_, index) => ({
            name: drink[`strIngredient${index + 1}`]
              ? drink[`strIngredient${index + 1}`].trim()
              : '',
            quantity: drink[`strMeasure${index + 1}`]
              ? drink[`strMeasure${index + 1}`].trim()
              : '',
          }))
          .filter(ingredient => !!ingredient.name),
      }))
      .filter(
        ({ name, imageURL, glassType, instructions }) =>
          !!name && !!imageURL && !!glassType && !!instructions,
      );

    data.forEach(drink => {
      const cocktail = new Cocktail(drink);
      cocktail.save();
    });
  } catch (err) {
    console.log('Error while seeding database:', err);
  }
};

module.exports = seed;

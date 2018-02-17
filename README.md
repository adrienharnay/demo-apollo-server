# 🍸 demo-apollo-server

This demo app creates a MongoDB collection and exposes it via a GraphQL endpoint.

## How to use

### With distant database

```bash
yarn
USE_DISTANT_DB=true yarn start
open http://localhost:3000/graphiql
```

Connect to [this local URL](<http://localhost:3000/graphiql?query=query%20%7B%0A%09cocktails%20%7B%0A%20%20%23%20cocktails(name%3A%20%22Gin%20Fizz%22)%20%7B%0A%20%20%23%20cocktails(ingredient%3A%20%22Vodka%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20imageURL%0A%20%20%20%20likes%0A%20%20%20%20glassType%0A%20%20%20%20instructions%0A%20%20%20%20ingredients%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20quantity%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>) for a pre-filled query.

### With local database

You need to install `mongodb` on your machine first.

```bash
yarn
mongod
yarn start
open http://localhost:3000/graphiql
```

Connect to [this local URL](<http://localhost:3000/graphiql?query=query%20%7B%0A%09cocktails%20%7B%0A%20%20%23%20cocktails(name%3A%20%22Gin%20Fizz%22)%20%7B%0A%20%20%23%20cocktails(ingredient%3A%20%22Vodka%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20imageURL%0A%20%20%20%20likes%0A%20%20%20%20glassType%0A%20%20%20%20instructions%0A%20%20%20%20ingredients%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20quantity%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>) for a pre-filled query.

## Misc

Thanks to [TheCocktailDB](http://www.thecocktaildb.com/) for the data!

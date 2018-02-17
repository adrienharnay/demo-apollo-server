# 🍸 demo-apollo-server

This demo app creates a MongoDB collection and exposes it via a GraphQL endpoint.

## Requirements

You need to install `mongodb` on your machine.

## How to use

```bash
yarn
mongod
yarn start
open http://localhost:3000/graphiql?query=query%20%7B%0A%09cocktails%20%7B%0A%20%20%23%20cocktails(name%3A%20%22Gin%20Fizz%22)%20%7B%0A%20%20%23%20cocktails(ingredient%3A%20%22Vodka%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20imageURL%0A%20%20%20%20likes%0A%20%20%20%20glassType%0A%20%20%20%20instructions%0A%20%20%20%20ingredients%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20quantity%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D
```

## Misc

Thanks to [TheCocktailDB](http://www.thecocktaildb.com/) for the data!

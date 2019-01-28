# 🍸 demo-apollo-server

[Live demo](<https://demo-apollo-server.herokuapp.com/graphql?query=query%20%7B%0A%09cocktails%20%7B%0A%20%20%23%20cocktails(ingredient%3A%20%22Vodka%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20imageURL%0A%20%20%20%20likes%0A%20%20%20%20glassType%0A%20%20%20%20instructions%0A%20%20%20%20ingredients%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20quantity%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>) - [Slides](https://slides-apollo-server.netlify.com/) - [Apollo-client part](https://github.com/adrienharnay/demo-apollo-client)

This demo app creates a MongoDB collection, exposes it via a GraphQL endpoint, and also creates corresponding REST endpoints.

## How to use

### HTTP headers

You will need to authenticate yourself by filling GraphQL Playground's HTTP headers:

```json
{
  "device_id": "test"
}
```

### Running with distant database

```bash
yarn
USE_DISTANT_DB=true DB_USER=demo-apollo-server DB_PASSWORD=apollo yarn start
open http://localhost:3000/graphql
```

Connect to [this local URL](<http://localhost:3000/graphql?query=query%20%7B%0A%09cocktails%20%7B%0A%20%20%23%20cocktails(ingredient%3A%20%22Vodka%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20imageURL%0A%20%20%20%20likes%0A%20%20%20%20glassType%0A%20%20%20%20instructions%0A%20%20%20%20ingredients%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20quantity%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>) for a pre-filled query.

### Running with local database

You need to install `mongodb` on your machine first.

```bash
yarn
mongod
yarn start
open http://localhost:3000/graphql
```

Connect to [this local URL](<http://localhost:3000/graphql?query=query%20%7B%0A%09cocktails%20%7B%0A%20%20%23%20cocktails(ingredient%3A%20%22Vodka%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20imageURL%0A%20%20%20%20likes%0A%20%20%20%20glassType%0A%20%20%20%20instructions%0A%20%20%20%20ingredients%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20quantity%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>) for a pre-filled query.

## REST

[OpenAPI documentation](./swagger.yml)

- GET /api/cocktails
- GET /api/liked-cocktails
- GET /api/bookmarked-cocktails
- GET /api/cocktail/:id
- POST /api/toggle-like-cocktail?id=xxx
- POST /api/toggle-bookmark-cocktail?id=xxx

## Misc

Thanks to [TheCocktailDB](http://www.thecocktaildb.com/) for the data!

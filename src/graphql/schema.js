const { gql } = require('apollo-server');

const typeDefinitions = gql`
  """
  Combined to other ingredients, the key element to a nice cocktail.
  """
  type Ingredient {
    id: ID!
    name: String!
    quantity: String
  }

  """
  An alcoholic (or non-alcoholic) drink consisting of a spirit or spirits mixed with other ingredients, such as fruit juice or cream.
  """
  type Cocktail {
    id: ID!
    name: String!
    imageURL: String!
    likes: Int!
    glassType: String!
    instructions: String!
    ingredients: [Ingredient]!
    liked: Boolean!
    bookmarked: Boolean!
  }

  """
  The list of all queries available.
  """
  type Query {
    cocktails(ingredient: String): [Cocktail]!
    cocktail(id: ID!): Cocktail
  }

  """
  The list of all queries available.
  """
  type Mutation {
    toggleLikeCocktail(id: ID!): Cocktail
    toggleBookmarkCocktail(id: ID!): Cocktail
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = [typeDefinitions];

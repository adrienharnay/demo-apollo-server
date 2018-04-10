const typeDefinitions = `
"""
Combined with other ingredients, the key element to a nice cocktail.
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
  ingredients: [Ingredient]!,
}

"""
The list of all queries available.
"""
type RootQuery {
  cocktails(ingredient: String): [Cocktail]!
  cocktail(id: ID!): Cocktail
}

schema {
  query: RootQuery
}
`;

module.exports = [typeDefinitions];

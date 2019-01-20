const { ApolloServer } = require('apollo-server');

const { connectToDatabase } = require('./database/connect');

const Schema = require('./graphql/schema');
const Resolvers = require('./graphql/resolvers');
const Connectors = require('./graphql/connectors');

connectToDatabase();

const server = new ApolloServer({
  typeDefs: Schema,
  resolvers: Resolvers,
  context: {
    constructor: Connectors,
  },
});

server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

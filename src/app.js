const { ApolloServer, AuthenticationError } = require('apollo-server');

const { connectToDatabase } = require('./database/connect');

const Schema = require('./graphql/schema');
const Resolvers = require('./graphql/resolvers');
const Connectors = require('./graphql/connectors');

connectToDatabase();

const server = new ApolloServer({
  typeDefs: Schema,
  resolvers: Resolvers,
  context: ({ req }) => {
    const deviceId = req.headers.device_id;

    if (!deviceId) {
      throw new AuthenticationError('You must provide the [device_id] header');
    }

    return {
      constructor: Connectors,
      deviceId,
    };
  },
});

server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { default: sofa } = require('sofa-api');

const { connectToDatabase } = require('./database/connect');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const connectors = require('./graphql/connectors');

const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

const context = ({ req }) => {
  const deviceId = req.headers.device_id;

  if (!deviceId) {
    throw new AuthenticationError('You must provide the [device_id] header');
  }

  return {
    constructor: connectors,
    deviceId,
  };
};

connectToDatabase();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
});

const app = express();
server.applyMiddleware({ app });

app.use('/api', sofa({ schema: executableSchema, context }));

app.listen({ port: process.env.PORT || 3000 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 3000}${
      server.graphqlPath
    }`,
  );
});

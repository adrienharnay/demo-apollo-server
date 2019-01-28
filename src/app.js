const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { default: sofa, OpenAPI } = require('sofa-api');

const connectToDatabase = require('./database/connect');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');

const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

connectToDatabase();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
});

const app = express();
server.applyMiddleware({ app });

const openApi = OpenAPI({
  schema: executableSchema,
  info: {
    title: 'Cocktails API',
    version: '1.0.0',
  },
});

app.use(
  '/api',
  sofa({
    schema: executableSchema,
    context,
    onRoute(info) {
      openApi.addRoute(info, {
        basePath: '/api',
      });
    },
  }),
);

openApi.save('./swagger.yml');

app.listen({ port: process.env.PORT || 3000 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 3000}${
      server.graphqlPath
    }`,
  );
});

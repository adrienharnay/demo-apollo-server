const { apolloExpress, graphiqlExpress } = require('apollo-server');
const bodyParser = require('body-parser');
const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');

const seed = require('./seed');

const PORT = 3000;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apollo', (err, data) => {
  if (err) {
    return err;
  }
  mongoose.connection.db.dropDatabase();
  seed();
  return true;
});

const Schema = require('./schema');
const Resolvers = require('./resolvers');
const Connectors = require('./connectors');

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

app.use(
  '/graphql',
  bodyParser.json(),
  apolloExpress({
    schema: executableSchema,
    context: {
      constructor: Connectors,
    },
  }),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () =>
  console.log(
    `GraphQL Server is now running on http://localhost:${PORT}/graphql`,
  ),
);

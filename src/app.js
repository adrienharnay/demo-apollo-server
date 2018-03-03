const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');

const seed = require('./seed');

const PORT = process.env.PORT || 3000;
const USE_DISTANT_DB =
  process.env.NODE_ENV === 'production' ||
  process.env.USE_DISTANT_DB === 'true';
const app = express();

mongoose.Promise = global.Promise;

if (!USE_DISTANT_DB) {
  mongoose.connect('mongodb://localhost/demo-apollo-server', (err, data) => {
    if (err) {
      return err;
    }
    mongoose.connection.db.dropDatabase();
    seed();
    return true;
  });
} else {
  mongoose.connect(
    'mongodb://demo-apollo-server:apollo@ds237868.mlab.com:37868/demo-apollo-server',
    (err, data) => {
      if (err) {
        return err;
      }
      return true;
    },
  );
}

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
  graphqlExpress({
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

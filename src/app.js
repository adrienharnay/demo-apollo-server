const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const seed = require('./seed');

const PORT = process.env.PORT || 3000;
const USE_DISTANT_DB =
  process.env.NODE_ENV === 'production' ||
  process.env.USE_DISTANT_DB === 'true';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.Promise = global.Promise;

if (!USE_DISTANT_DB) {
  mongoose.connect(
    'mongodb://localhost/demo-apollo-server',
    (err, data) => {
      if (err) {
        return err;
      }
      mongoose.connection.db.dropDatabase();
      seed();
      return true;
    },
  );
} else {
  mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@ds237868.mlab.com:37868/demo-apollo-server`,
    err => {
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

const server = new ApolloServer({
  typeDefs: Schema,
  resolvers: Resolvers,
  context: {
    constructor: Connectors,
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

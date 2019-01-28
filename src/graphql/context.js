const { ApolloServer, AuthenticationError } = require('apollo-server-express');

const connectors = require('./connectors');

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

module.exports = context;

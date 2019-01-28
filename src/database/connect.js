const mongoose = require('mongoose');

const seed = require('./seed');

const USE_DISTANT_DB =
  process.env.NODE_ENV === 'production' ||
  process.env.USE_DISTANT_DB === 'true';
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectToDatabase = () => {
  mongoose.Promise = global.Promise;

  if (!USE_DISTANT_DB) {
    mongoose.connect(
      'mongodb://localhost/demo-apollo-server',
      { useNewUrlParser: true },
      err => {
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
      { useNewUrlParser: true },
      err => {
        if (err) {
          return err;
        }
        return true;
      },
    );
  }
};

module.exports = connectToDatabase;

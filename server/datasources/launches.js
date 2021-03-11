const { MongoDataSource } = require('apollo-datasource-mongodb');

class Launches extends MongoDataSource {
  async getAllLaunches() {
    return launches;
  }
}

module.exports = Launches;

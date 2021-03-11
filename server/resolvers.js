module.exports = {
    Query: {
      launches: async (_, __, { dataSources }) => {
        return dataSources.launches.getAllLaunches()
      }
    }
  };
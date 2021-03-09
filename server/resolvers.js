// import { LaunchAPI } from './datasources/launch';

module.exports = {
    Query: {
      launches: (_, __, { dataSources }) =>
        dataSources.launchAPI.getAllLaunches(),
    }
  };
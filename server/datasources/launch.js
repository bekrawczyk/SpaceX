const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v4/';
  }

  async getAllLaunches() {
    const response = await this.get('launches/upcoming');
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  launchReducer(launch) {
    return {
      id: launch.id || 0,
      name: launch.name,
      mission_name: launch.mission_name,
    };
  }
}

module.exports = LaunchAPI;


const Launches = (mongoDbConnection) =>  {
  async function getAllLaunches() {
    const launchesArray =  await mongoDbConnection.find().toArray();
    return Array.isArray(launchesArray) 
      ? launchesArray
      : [];
  }

  return {
    getAllLaunches,
  }
}

module.exports = Launches;

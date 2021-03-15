
const Launches = (mongoDbConnection) =>  {
  async function getAllLaunches() {
    const launchesArray =  await mongoDbConnection.find().toArray();
    return Array.isArray(launchesArray) 
      ? launchesArray
      : [];
  }

  async function editLaunch() {
    const updatedLaunch = await mongoDbConnection.findOneAndUpdate(
      id,
      { input },
      { new: true }
    );
    return updatedLaunch;
  }
  
//tutaj logika, przenieść blok try-catch


  return {
    getAllLaunches,
    editLaunch
  }
}

module.exports = Launches;

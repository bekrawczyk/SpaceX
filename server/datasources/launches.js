
const Launches = (mongoDbConnection) =>  {
  async function getAllLaunches() {
    const launchesArray =  await mongoDbConnection.find().toArray();
    return Array.isArray(launchesArray) 
      ? launchesArray
      : [];
  }

  async function editLaunch(id, input) {
    const updatedLaunch = await mongoDbConnection.findOneAndUpdate(
      { id: id },
      { $set: {
        "details": input.details, 
        "flight_number": input.flight_number,
        "name": input.name,
        "success": input.success,
        "upcoming": input.upcoming,
      }},
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

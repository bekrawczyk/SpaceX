
//zmiana nazwy np launchesAPI - eby było wiadomo, ze realizuje funkcję zwiaązaną z launchami
const Launches = (mongoDbConnection) =>  {
  async function getAllLaunches() {
    const launchesArray =  await mongoDbConnection.find().toArray();
    return Array.isArray(launchesArray) 
      ? launchesArray
      : [];
  }
//oprócz value jeszcze status powodzenia operacji, komunikaty/ zachowania aplikacji 

  async function editLaunch(id, input) {
    const updatedLaunch = await mongoDbConnection.findOneAndUpdate(
      { id },
      { $set: {
        "details": input.details, 
        "flight_number": input.flight_number,
        "name": input.name,
        "success": input.success,
        "upcoming": input.upcoming,
      }},
      //set wypełnić inputem = $set: input
    );
    return updatedLaunch;
  }
  //zmiana nazwy z input na launch lub newLaunch lub updatedLaunchData
//tutaj logika, przenieść blok try-catch


  return {
    getAllLaunches,
    editLaunch
  }
}

module.exports = Launches;

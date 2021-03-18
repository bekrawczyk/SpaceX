
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
      //zrobić to ładniej, nie chcemy potworów frankensteina 
    );

    const editedLaunchInput = {
      date_utc: updatedLaunch.value.date_utc,
      details: updatedLaunch.value.details, 
      flight_number: updatedLaunch.value.flight_number,
      id: updatedLaunch.value.id,
      name: updatedLaunch.value.name,
      success: updatedLaunch.value.success,
      upcoming: updatedLaunch.value.upcoming,
    }

    return editedLaunchInput;
  }
  //zmiana nazwy z input na launch lub newLaunch lub updatedLaunchData
//tutaj logika, przenieść blok try-catch


  return {
    getAllLaunches,
    editLaunch
  }
}

module.exports = Launches;

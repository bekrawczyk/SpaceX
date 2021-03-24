
//zmiana nazwy np launchesAPI - eby było wiadomo, ze realizuje funkcję zwiaązaną z launchami
const Launches = (mongoDbConnection) =>  {
  async function getAllLaunches() {
    const launchesArray =  await mongoDbConnection.find().toArray();
    return Array.isArray(launchesArray) 
      ? launchesArray.reverse()
      : [];
  }
//oprócz value jeszcze status powodzenia operacji, komunikaty/ zachowania aplikacji 

  async function editLaunch(_id, input) {
    const updatedLaunch = await mongoDbConnection.findOneAndUpdate(
      { _id },
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
      _id: updatedLaunch.value._id,
      name: updatedLaunch.value.name,
      success: updatedLaunch.value.success,
      upcoming: updatedLaunch.value.upcoming,
    }

    return editedLaunchInput;
  }
  //zmiana nazwy z input na launch lub newLaunch lub updatedLaunchData
//tutaj logika, przenieść blok try-catch
  async function addLaunch(input) {
    const addedLaunch = await mongoDbConnection.insertOne(
      {
        date_utc: input.date_utc,
        details: input.details, 
        flight_number: input.flight_number,
        name: input.name,
        success: input.success,
        upcoming: input.upcoming,
      }
    );
    const newLaunchInput = {
      date_utc: addedLaunch.ops[0].date_utc,
      details: addedLaunch.ops[0].details, 
      flight_number: addedLaunch.ops[0].flight_number,
      _id: addedLaunch.ops[0]._id,
      name: addedLaunch.ops[0].name,
      success: addedLaunch.ops[0].success,
      upcoming: addedLaunch.ops[0].upcoming,
    };
    return newLaunchInput;
  }

  return {
    getAllLaunches,
    editLaunch,
    addLaunch,
  }
}

module.exports = Launches;

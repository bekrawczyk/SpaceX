module.exports = {
    Query: {
      getAllLaunches: async (_, __, { dataSources: {allLaunches} }) => {
        try {
          const launches = await allLaunches.getAllLaunches();
          return launches
        } catch(err){
          throw new Error(err)
        }
      }
    }
  };

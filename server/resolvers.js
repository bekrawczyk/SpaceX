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
    },
    
    Mutation: {
      editLaunch: async (_, { id, input }, { dataSources: {allLaunches} }) => {
        const updatedLaunch = await allLaunches.editLaunch({id, input}); 
        return updatedLaunch;
      }
      },

      //tu wywołanie mutacji, query itp, nie wrzucać logiki - usumąć try...catch
  };

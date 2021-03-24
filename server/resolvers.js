module.exports = {
    Query: {
      getAllLaunches: async (_, __, { dataSources: {allLaunches} }) => {
        try {
          const launches = await allLaunches.getAllLaunches();
          return launches;

          // lub return await allLaunches.getAllLaunches();
        } catch(err) {
          throw new Error(err);
        }
      }
    },
    
    Mutation: {
      editLaunch: async (_, { _id, input }, { dataSources: { allLaunches } }) => {
        const updatedLaunch = await allLaunches.editLaunch(_id, input); 
        return updatedLaunch;
      }, 

      addLaunch: async (_, { input }, { dataSources: { allLaunches } }) => {
        const newLaunch = await allLaunches.addLaunch(input);
        return newLaunch;
      }

      },

      //tu wywołanie mutacji, query itp, nie wrzucać logiki - usumąć try...catch
      //sprawdzić konwencję kiedy łapie się błędy - resolver czy osobne pliki (tu launches.js)
  };

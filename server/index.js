// import { ApolloServer } from 'apollo-server-hapi';
const Hapi = require('@hapi/hapi');
const { ApolloServer } = require('apollo-server-hapi');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const LaunchAPI = require('./datasources/launch');

const HOST = 'localhost';
const PORT = 5000;

async function startServer() {
  const server = new ApolloServer({ 
    typeDefs,  
    dataSources: () => {
      launchAPI: new LaunchAPI()
    },
    resolvers,});

  const app = new Hapi.server({
    port: PORT,
    host: HOST
  });

  await server.applyMiddleware({
    app,
  });

  await server.installSubscriptionHandlers(app.listener);

  try {
      await app.start();
  } catch (err) {
      console.log(`Error while starting server: ${err.message}`);
  }
      console.log(`Server running at localhost, port: ${app.info.port}`);
}

startServer();

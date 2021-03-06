const Hapi = require('@hapi/hapi');
const { ApolloServer } = require('apollo-server-hapi');
const { MongoClient } = require('mongodb');

const { MONGODB } = require('./config');
const Launches = require('./datasources/launches');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const HOST = 'localhost';
const PORT = 5000;
//albo przenieść do config, tworzysz pliki .env => paczka environmentDotEnv npm 

const client = new MongoClient(MONGODB,  { useUnifiedTopology: true });
client.connect();
//clinet.connect() albo w bloku start server, albo w try...catch , gdy nie połączy się z bazą a sam serwer wystartuje

async function startServer() {
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,  
    dataSources: () => {
      return {
        allLaunches: Launches(client.db().collection('launches'))
      }
    },
    //lub zdj ze slacka
  });

  const app = new Hapi.server({
    port: PORT,
    host: HOST,
  });

  app.route({
    method: 'OPTIONS',
    path: '/graphql',
    config: {
      handler: (request, h) => {
        return h
          .response()
          .header('Access-Control-Allow-Methods', 'POST')
          .header('Access-Control-Allow-Origin', '*')
          .header('Access-Control-Allow-Headers', 'Content-Type');
      }
    }
  });

  await server.applyMiddleware({
    app,
  });

  server.installSubscriptionHandlers(app.listener);

  try {
      await app.start();
  } catch (err) {
      console.log(`Error while starting server: ${err.message}`);
  }
      console.log(`Server running at localhost, port: ${app.info.port}`);
}

startServer();

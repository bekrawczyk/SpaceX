'use strict';

const Hapi = require('@hapi/hapi');
const graphqlHapi = require('apollo-server-hapi');
const LaunchAPI = require('./datasources/launch');

const resolvers = require('./resolvers');
const schema = require('./schema');

const HOST = 'localhost';
const PORT = 3000;

async function StartServer() {
  const server = new Hapi.server({
    host: HOST,
    port: PORT,
    
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema: schema,
        resolvers: resolvers,
      },
      route: {
        cors: true,
      },
    },
  });

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();

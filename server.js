require('dotenv').config()

const express = require('express')
const { ApolloServer, gql, GraphQLExtension } = require('apollo-server-express');
const http = require('http');

//Schema
const {resolvers} = require('./gql-resolver.js')
const {typeDefs} = require('./gql-types')

const app = express();
GraphQLExtension.didEncounterErrors



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({ 
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: () => console.log('Connected to websocket'),
    onDisconnect: () => console.log('Disconnected from websocket'),
    onError: (err) => console.error(err)
  },
  tracing: true,
 });

apolloServer.applyMiddleware({app})

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

// The `listen` method launches a web server.
httpServer.listen(4001,() => {
    console.log(`🚀  Server ready at ${process.env.URL}${apolloServer.graphqlPath}`);
    console.log(`Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`)
  })
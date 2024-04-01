import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from "dotenv"
import  typeDefs from "./typeDefs/index.js"
import  resolvers  from "./resolvers/index.js"
import connectToDB from "./db/connectDb.js"

const app = express();
dotenv.config()

const PORT=process.env.PORT || 3000
const MongoURI=process.env.MONGOURI

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  '/',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({req}),
  }),
);

await new Promise((resolve) => httpServer.listen({ port:PORT }, resolve));
await connectToDB(MongoURI)

console.log(`🚀 Server ready at http://localhost:${PORT}/`);
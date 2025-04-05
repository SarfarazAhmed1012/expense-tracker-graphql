import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from "path";

import passport from 'passport';
import session from 'express-session';
import ConnectMongo from "connect-mongodb-session";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from "./db/connectDB.js";
import { buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.config.js";

import job from "./cron.js";

job.start();

const __dirname = path.resolve();
dotenv.config();
configurePassport();

const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = ConnectMongo(session);

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
})

store.on("error", function (error) {
    console.log(error);
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // this check specifies whether to save the session to the store on every request
    saveUninitialized: false, // this check specifies whether to create a session for the user if it does not exist
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true, // this check specifies that the cookie is not accessible via JavaScript, and to prevent XSS attacks
    },
    store: store,

}))

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/graphql',
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
    }),
);


app.use(express.static(path.join(__dirname, "frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"))
})
// Modified server startup
await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

await connectDB()
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
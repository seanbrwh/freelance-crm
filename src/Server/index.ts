import "dotenv/config";
import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./routes";
import middleware from "./middleware";
import connect from "./connect";
import { generateKeys, checkForKeys } from "./Jobs/GenerateKeys";

checkForKeys();
generateKeys.start();

const { PORT } = process.env;

const router = express();

const db = "mongodb://mongo:27017";

applyMiddleware(middleware, router);
connect({ db });
applyRoutes(routes, router);

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Application being served at http://localhost:${PORT}`);
});

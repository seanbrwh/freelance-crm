import "dotenv/config";
import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./routes";
import middleware from "./middleware";

const { PORT } = process.env;

const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Application being served at http://localhost:${PORT}`);
});

import express, { Router, Application } from "express";
import cors from "cors";
import parser from "body-parser";
import compress from "compression";
import morgan from "morgan";
import path from "path";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

const { LOCAL } = process.env;

const authConfig = {
  domain: "dev-ib51uhnr.auth0.com",
  audience: "freelance-crm"
};

export const checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RSA256"]
});

export const handleCors = (router: Router) => {
  router.use(cors());
};
export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true, limit: "50mb" }));
  router.use(parser.json());
};
export const handleCompression = (router: Router) => {
  router.use(compress());
};
export const handleLogging = (router: Router) => {
  router.use(morgan("tiny"));
};
export const setBasePath = (router: Application) => {
  router.set("views", path.join(__dirname, "../views"));
};
export const setViewEngine = (router: Application) => {
  router.set("view engine", "ejs");
};
export const setStaticPath = (router: Router) => {
  router.use(
    "/dist/static",
    express.static(path.join(__dirname, "../../dist/static"))
  );
};
export const serveIndex = (router: Router) => {
  router.use(
    "*",
    (req, res, next) => {
      if (req.headers.authorization && checkJWT) {
        return next();
      } else if (req.url.includes("/api") && !checkJWT) {
        res
          .status(401)
          .send({ error: "You must be authenticated to access this api" });
      } else {
        res.send({ error: "need" });
      }
    },
    (req, res) => {
      res.setHeader("cache-control", "no-store");
      res.render("index", {
        jsMainFile: LOCAL
          ? "http://localhost:3015/freelance-crm.js"
          : require("./dist/static/manifest.json")["freelance-crm.js"]
      });
    }
  );
};

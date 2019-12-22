import express, { Router, Application } from "express";
import cors from "cors";
import parser from "body-parser";
import compress from "compression";
import morgan from "morgan";
import path from "path";
import jwt from "jsonwebtoken";

const { LOCAL } = process.env;

export const signToken = (user: any) => {
  let { _id, email } = user;
  const JWTToken = jwt.sign(
    {
      email: email,
      _id: _id
    },
    "secret",
    { expiresIn: "2h" }
  );
  return JWTToken;
};

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
  router.use("*", (req, res, next) => {
    if (req.originalUrl.includes("/api")) {
      return next();
    } else {
      res.setHeader("Cache-Control", "no-store");
      res.render("index", {
        jsMainFile: LOCAL
          ? "http://localhost:3015/freelance-crm.js"
          : require("./dist/static/manifest.json")["freelance-crm.js"]
      });
    }
  });
};

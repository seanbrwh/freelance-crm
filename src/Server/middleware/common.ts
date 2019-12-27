import express, { Router, Application } from "express";
import cors from "cors";
import parser from "body-parser";
import compress from "compression";
import morgan from "morgan";
import path from "path";
import nodemailer from "nodemailer";
import session from "express-session";

const {
  LOCAL,
  MAIL_USERNAME,
  MAIL_PASS,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE
} = process.env;

export const handleCors = (router: Router) => {
  router.use(cors());
};
export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true, limit: "50mb" }));
  router.use(parser.json());
  router.use(parser.json({ type: "application/vnd.api+json" }));
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
  router.use("/dist", express.static(path.join(__dirname, "../../dist")));
};
export const setSession = (router: Router) => {
  router.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
};

export var transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: +MAIL_PORT,
  secure: MAIL_SECURE == "true",
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASS
  }
});

export const serveIndex = (router: Router) => {
  router.use("*", (req, res, next) => {
    if (
      req.originalUrl.includes("/api") ||
      req.originalUrl.includes("/verify") ||
      req.originalUrl.includes("/favicon.ico")
    ) {
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

import express, { Router, Application } from "express";
import cors from "cors";
import parser from "body-parser";
import compress from "compression";
import morgan from "morgan";
import path from "path";

export const handleCors = (router: Router) => {
  router.use(cors({ credentials: true, origin: true }));
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

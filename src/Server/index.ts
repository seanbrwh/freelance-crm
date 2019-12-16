import "dotenv/config";
import http from "http";
import express from "express";
import path from "path";
import cors from "cors";
import parser from "body-parser";
import compress from "compression";
import logger from "morgan";

const { PORT, LOCAL } = process.env;

const router = express();

router.set("views", path.join(__dirname, "./views"));
router.set("view engine", "ejs");
router.use(
  "/dist/static",
  express.static(path.join(__dirname, "../../dist/static"))
);

router.use(cors({ credentials: true, origin: true }));
router.use(parser.urlencoded({ extended: false, limit: "50mb" }));
router.use(parser.json());
router.use(compress());
router.use(logger("tiny"));

router.use("*", (req, res) => {
  res.setHeader("cache-control", "no-store");
  res.render("index", {
    jsMainFile: LOCAL
      ? "http://localhost:3015/freelance-crm.js"
      : require("./dist/static/manifest.json")["freelance-crm.js"]
  });
});

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Application being served at http://localhost:${PORT}`);
});

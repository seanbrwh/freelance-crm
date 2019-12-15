import "dotenv/config";
import http from "http";
import express from "express";
import path from "path";

const { PORT, LOCAL } = process.env;

const router = express();

router.set("views", path.join(__dirname, "views"));
router.set("view engine", "ejs");
router.use("*", (req, res) => {
  res.render("index", {
    jsMainfile: LOCAL
      ? "http://localhost:3015/freelance-crm.js"
      : require("./dist/static/manifest.json")["freelance-crm.js"]
  });
});

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Application being served at http://localhost:${PORT}`);
});

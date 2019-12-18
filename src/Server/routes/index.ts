import "dotenv/config";
import { Request, Response } from "express";

const { LOCAL } = process.env;

export default [
  {
    path: "*",
    method: "get",
    handler: [
      (req: Request, res: Response) => {
        res.render("index", {
          jsMainFile: LOCAL
            ? "http://localhost:3015/freelance-crm.js"
            : require("./dist/static/manifest.json")["freelance-crm.js"]
        });
      }
    ]
  }
];

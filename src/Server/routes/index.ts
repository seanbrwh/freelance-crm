import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import UserController from "../controllers/User.controller";

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
  // {
  //   path: "/api/user",
  //   method: "post",
  //   handler: [
  //     async (req: Request, res: Response) => {
  //       let { firstName, lastName, email } = req.body;
  //       const user = await UserController.CreateUser({
  //         firstName,
  //         lastName,
  //         email
  //       });
  //       return res.send({ user });
  //     }
  //   ]
  // }
];

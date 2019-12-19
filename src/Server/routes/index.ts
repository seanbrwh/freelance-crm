import { checkJWT } from "./../middleware/common";
import "dotenv/config";
import { Request, Response } from "express";
import UserController from "../controllers/User.controller";

export default [
  {
    path: "/api/test",
    method: "get",
    handler: [
      checkJWT,
      (req: Request, res: Response) => {
        res.send({ msg: "you have authenticated" });
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

import { Request, Response } from "express";
import { transport } from "./../middleware/common";
import { message } from "./../middleware/MailTemplates/index";
import UserController from "../controllers/User.controller";

export default [
  {
    path: "/api/send_mail",
    method: "get",
    handler: [
      (req: Request, res: Response) => {
        console.log("Sending mail");
        var link, msg;
        const user = UserController.FindOne(req.body.email).then(result => {
          link = "http://" + req.get("host") + "/verify?id=" + result._id;
          msg = message(req.body.email, link);
        });
        transport.sendMail(msg, (err, info) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Mail sent");
            console.log(info);
          }
        });
      }
    ]
  }
];

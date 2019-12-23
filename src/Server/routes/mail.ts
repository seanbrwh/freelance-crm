import { Request, Response } from "express";
import { transport } from "./../middleware/common";

export default [
  {
    path: "/api/send_mail",
    method: "get",
    handler: [
      (req: Request, res: Response) => {
        console.log("Sending mail");
        const message = {
          from: "seanbrwh@gmail.com",
          to: req.body.email,
          subject: "Email confirmation",
          text: "successfully recieved useing node <href></href>",
          attachments: [
            {
              filename: "",
              path: ""
            }
          ]
        };
        transport.sendMail(message, (err, info) => {
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

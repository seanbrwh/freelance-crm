import { transport } from "./../middleware/common";
import { message } from "./../middleware/MailTemplates/index";
import "dotenv/config";
import mongoose from "mongoose";
import url from "url";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { signToken } from "./../middleware/token";
import UserController from "../controllers/User.controller";

export default [
  {
    path: "/api/test",
    method: "get",
    handler: [
      (req: Request, res: Response) => {
        res.status(200).send({ msg: "you have authenticated" });
      }
    ]
  },
  {
    path: "/api/signup",
    method: "post",
    handler: [
      (req: Request, res: Response) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).send({
              hashError: err
            });
          } else {
            const user = UserController.CreateUser({
              _id: mongoose.Types.ObjectId(),
              password: hash,
              email: req.body.email,
              emailVerified: false
            });
            user
              .then(result => {
                if (result._id) {
                  var link =
                    "http://" + req.get("host") + "/verify?id=" + result._id;
                  var msg = message(req.body.email, link);
                  transport.sendMail(msg, (err, info) => {
                    if (err) {
                      console.error(err);
                    } else {
                      res.status(201).send({
                        success: "user created",
                        mail: "sent",
                        mailInfo: info
                      });
                    }
                  });
                }
              })
              .catch(err => {
                if (err) {
                  console.error(err);
                }
              });
          }
        });
      }
    ]
  },
  {
    path: "/verify",
    method: "get",
    handler: [
      (req: Request, res: Response) => {
        UserController.FindOne({ _id: req.query.id }).then(result => {
          if (result) {
            var tokenUser = {
              email: result.email,
              password: result.password
            };
            var token = signToken(tokenUser, {
              iss: "me",
              sub: "me",
              aud: req.originalUrl
            });
            var authRes = {
              success: "Email verified",
              token: token,
              expires_at: new Date().getTime() + 7200000,
              email: result.email
            };
            res.redirect(
              url.format({
                pathname: "/",
                query: authRes
              })
            );
          }
        });
      }
    ]
  },
  {
    path: "/api/signin",
    method: "post",
    handler: [
      (req: Request, res: Response) => {
        UserController.FindOne({ email: req.body.email })
          .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
              if (err) {
                return res.status(401).send({
                  failed: "unauthorized access"
                });
              }
              if (result) {
                var tokenUser = { email: user.email, password: user.password };
                console.log(tokenUser);
                var token = signToken(tokenUser, {
                  iss: "me",
                  sub: "me",
                  aud: req.originalUrl
                });
                return res.status(200).send({
                  success: "success",
                  token: token,
                  expires_at: new Date().getTime() + 7200000,
                  email: user.email
                });
              }
              return res.status(401).send({
                failed: "Unauthorized access"
              });
            });
          })
          .catch(error => {
            res.status(500).send({
              hash: error
            });
          });
      }
    ]
  }
];

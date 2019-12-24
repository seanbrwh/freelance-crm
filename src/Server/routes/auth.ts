import { transport } from "./../middleware/common";
import { message } from "./../middleware/MailTemplates/index";
import "dotenv/config";
import mongoose from "mongoose";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { signToken, verifyToken } from "./../middleware/token";
import UserController from "../controllers/User.controller";
import url from "url";
import crypto from "crypto";

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
              emailVerified: false,
              nonce: "something"
            });
            user
              .then(result => {
                if (result._id) {
                  var link =
                    "http://" +
                    req.get("host") +
                    "/verify?nonce=" +
                    result.nonce;
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
    path: "/api/signupAndVerify",
    method: "post",
    handler: [
      (req: Request, res: Response) => {
        //create user, send a verify email, then send token.
        if (req.body.email && req.body.password) {
          let { email, password } = req.body;
          bcrypt.hash(password, 10, (err, hash) => {
            UserController.FindOne({ email: email }).then(result => {
              if (result) {
                return res.redirect("/sign-in");
              } else {
                UserController.CreateUser({
                  _id: mongoose.Types.ObjectId(),
                  password: hash,
                  email: email,
                  emailVerified: false,
                  nonce: crypto.randomBytes(16).toString("base64")
                })
                  .then(result => {
                    var tokenUser = {
                      email: result.email,
                      password: result.password
                    };
                    var token = signToken(tokenUser, {
                      iss: "me",
                      sub: "me",
                      aud: req.originalUrl
                    });
                    var link =
                      "http://" +
                      req.get("host") +
                      "/verify?nonce=" +
                      result.nonce;
                    var msg = message(req.body.email, link);
                    transport.sendMail(msg, (err, info) => {
                      if (err) {
                        console.error(err);
                      } else {
                        return res.status(200).send({
                          token: token,
                          expires_at: new Date().getTime() + 7200000,
                          user: { email: result.email }
                        });
                      }
                    });
                  })
                  .catch(err => {
                    console.error(err);
                  });
              }
            });
          });
        }
      }
    ]
  },
  {
    path: "/verify",
    method: "get",
    handler: [
      (req: Request, res: Response) => {
        if (req.query.nonce) {
          UserController.UpdateOne({
            nonce: req.query.nonce
          })
            .then(result => {
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
                  token: token,
                  expires_at: new Date().getTime() + 7200000,
                  user: { email: result.email }
                };

                res.redirect(
                  url.format({
                    pathname: "/callback",
                    query: {
                      token: authRes.token,
                      expiresAt: authRes.expires_at,
                      user: authRes.user
                    }
                  })
                );
              } else {
                res.status(404).send({ err: "Not Found" });
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          res.status(400).send({ error: "Bad Request" });
        }
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
                var token = signToken(tokenUser, {
                  iss: "me",
                  sub: "me",
                  aud: req.originalUrl
                });
                return res.status(200).send({
                  token: token,
                  expires_at: new Date().getTime() + 7200000,
                  user: { email: user.email }
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

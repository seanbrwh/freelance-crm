import { signToken } from "./../middleware/token";
import mongoose, { Schema } from "mongoose";
import "dotenv/config";
import { Request, Response } from "express";
import UserController from "../controllers/User.controller";
import bcrypt from "bcrypt";

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
              email: req.body.email
            });
            user
              .then(result => {
                res.status(201).send(result);
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

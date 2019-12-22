import { signToken } from "./../middleware/common";
import mongoose from "mongoose";
import "dotenv/config";
import { Request, Response } from "express";
import UserSchema from "../models/User.model";
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
            const user = new UserSchema({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              firstName: req.body.firstName,
              lastName: req.body.lastName
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(200).send({
                  success: "New user has been created"
                });
              })
              .catch(error => {
                res.status(500).send({
                  userError: error
                });
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
        UserSchema.findOne({ email: req.body.email })
          .exec()
          .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
              if (err) {
                return res.status(401).send({
                  failed: "unauthorized access"
                });
              }
              if (result) {
                var token = signToken(user);
                return res.status(200).send({
                  success: "Welcome to the JWT auth",
                  token: token
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

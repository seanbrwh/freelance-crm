"use strict";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const iss = "Freelance crm";
const sub = "some@user.com";
const aud = "http://localhost:3020";

const privateKey = fs.readFileSync(
  path.join(__dirname, "../Jobs/Keys/private.key"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../Jobs/Keys/public.key"),
  "utf8"
);

const signOptions = {
  issuer: iss,
  subject: sub,
  audience: aud,
  expiresIn: "2h",
  algorithm: "RS256"
};

const verifyOptions = {
  issuer: iss,
  subject: sub,
  audience: aud,
  expiresIn: "2h",
  algorithm: ["RS256"]
};

export const signToken = (payload: any, $Options: any) => {
  /**
   * sOptions = {
   *  issuer:"AUTH/Resource/This server",
   *  subject: "iam@user.me",
   *  audience:"Client_identity" // this should be provided by the client
   * }
   */
  var signOptions = {
    issuer: $Options.iss,
    subject: $Options.sub,
    audience: $Options.aud,
    expiresIn: "2h",
    algorithm: "RS256"
  };

  return jwt.sign(
    payload,
    { key: privateKey, passphrase: "top secret" },
    signOptions
  );
};

export const verifyToken = (token: any, $Option: any) => {
  /**
   * vOption = {
   *  issuer:"AUTH/RESOURCE/THIS/SERVER",
   *  subject:"iam@user.me",
   *  audience:"Client_Identity" // this should be provided by the client
   * }
   */

  var verifyOptions = {
    issuer: $Option.iss,
    subject: $Option.sub,
    audience: $Option.aud,
    expiresIn: "30d",
    algorithm: ["RS256"]
  };
  try {
    return jwt.verify(token, publicKey, verifyOptions);
  } catch (error) {
    return false;
  }
};

export const decodeToken = (token: any) => {
  return jwt.decode(token, { complete: true });
};

"use strict";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const iss = "Freelance crm";
const sub = "some@user.com";
const aud = "http://localhost:3020";

var privateKey: any = null;
var publicKey: any = null;

(function getKeys() {
  if (
    fs.existsSync(path.join(__dirname, "../Jobs/Keys/private.key")) &&
    fs.existsSync(path.join(__dirname, "../Jobs/Keys/public.key"))
  ) {
    const privateK = fs.readFileSync(
      path.join(__dirname, "../Jobs/Keys/private.key"),
      "utf8"
    );
    const publicK = fs.readFileSync(
      path.join(__dirname, "../Jobs/Keys/public.key"),
      "utf8"
    );
    (privateKey = privateK), (publicKey = publicK);
  } else {
    (privateKey = "ERROR"), (publicKey = "ERROR");
  }
})();

interface signOptions {
  issuer: string;
  subject: string;
  audience: string;
  expiresIn: string;
  algorithm: string;
}

interface verifyOptions {
  issuer: string;
  subject: string;
  audience: string;
  expiresIn: string;
  algorithm: string[];
}

export const signToken = (payload: any, $Options: any) => {
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

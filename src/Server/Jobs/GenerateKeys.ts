import { generateKeyPair } from "crypto";
import cron from "node-cron";
import path from "path";
import fs from "fs";

const generateKey = () => {
  return generateKeyPair(
    "rsa",
    {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem"
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: "top secret"
      }
    },
    (err, publicKey, privateKey) => {
      console.log(publicKey);
      if (err) {
        throw err;
      } else {
        fs.mkdirSync(path.join(__dirname, "./Keys"));
        fs.writeFileSync(
          path.join(__dirname, "./Keys/public.key"),
          publicKey,
          "utf8"
        );
        fs.writeFileSync(
          path.join(__dirname, "./Keys/private.key"),
          privateKey,
          "utf8"
        );
      }
    }
  );
};

export const generateKeys = cron.schedule("0 0 23 1 * 1", () => {
  generateKey();
});

export const checkForKeys = () => {
  if (!fs.existsSync(path.join(__dirname, "./Keys/private.key"))) {
    generateKey();
  } else {
    return;
  }
};

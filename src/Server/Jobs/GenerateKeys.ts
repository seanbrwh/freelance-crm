import { generateKeyPair } from "crypto";
import cron from "node-cron";
import path from "path";
import fs from "fs";

export const generateKeys = cron.schedule("0 0 23 1 * 1", () => {
  generateKeyPair(
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
      if (err) {
        throw err;
      } else {
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
});

import mongoose from "mongoose";

type DBinput = {
  db: string;
};

export default ({ db }: DBinput) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch(err => {
        console.error(`Error connecting to database: `, err);
      });
  };
  connect();
};

import User, { IUser } from "../models/User.model";

interface ICreateUserInput {
  _id: IUser["_id"];
  email: IUser["email"];
  password: IUser["password"];
  emailVerified: IUser["emailVerified"];
  nonce: IUser["nonce"];
}
interface IFindOne {
  email?: string;
  _id?: any;
}

interface IUpdateOne {
  dataKey?: any;
  data?: any;
  nonce?: any;
}

async function CreateUser({
  _id,
  email,
  password,
  emailVerified,
  nonce
}: ICreateUserInput): Promise<IUser> {
  return User.create({ _id, email, password, emailVerified, nonce })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function FindOne({ email, _id }: IFindOne): Promise<IUser> {
  return User.findOne({ $or: [{ email }, { _id }] })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function UpdateOne({ nonce }: IUpdateOne): Promise<IUser> {
  return User.findOne({ nonce })
    .then((result: IUser) => {
      if (result) {
        result.nonce = nonce;
        return result;
      }
    })
    .catch((err: Error) => {
      throw err;
    });
}

export default { CreateUser, FindOne, UpdateOne };

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
}
interface IFindByNonce {
  nonce: any;
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

async function FindOne({ email }: IFindOne): Promise<IUser> {
  return User.findOne({ email })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
async function FindOneByNonce({ nonce }: IFindByNonce): Promise<IUser> {
  return User.findOne({ nonce })
    .then((data: IUser) => {
      return data;
    })
    .catch((err: Error) => {
      throw err;
    });
}

async function UpdateOne({ nonce }: IUpdateOne): Promise<IUser> {
  return User.findOne({ nonce })
    .then((result: IUser) => {
      if (result) {
        result.emailVerified = true;
        return result;
      }
    })
    .catch((err: Error) => {
      throw err;
    });
}

export default { CreateUser, FindOne, UpdateOne, FindOneByNonce };

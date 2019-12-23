import User, { IUser } from "../models/User.model";

interface ICreateUserInput {
  _id: IUser["_id"];
  email: IUser["email"];
  password: IUser["password"];
  emailVerified: IUser["emailVerified"];
}
interface IFindOne {
  email: string;
}

async function CreateUser({
  _id,
  email,
  password,
  emailVerified
}: ICreateUserInput): Promise<IUser> {
  return User.create({ _id, email, password, emailVerified })
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
export default { CreateUser, FindOne };

import User, { IUser } from "../models/User.model";

interface ICreateUserInput {
  _id: IUser["_id"];
  email: IUser["email"];
  password: IUser["password"];
}
interface IFindOne {
  email: string;
}

async function CreateUser({
  _id,
  email,
  password
}: ICreateUserInput): Promise<IUser> {
  return User.create({ _id, email, password })
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

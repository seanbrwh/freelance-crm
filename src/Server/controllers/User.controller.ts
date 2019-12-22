import User, { IUser } from "../models/User.model";

interface ICreateUserInput {
  email: IUser["email"];
  password: IUser["password"];
}

async function CreateUser({
  email,
  password
}: ICreateUserInput): Promise<IUser> {
  return User.create({ email, password })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
export default { CreateUser };

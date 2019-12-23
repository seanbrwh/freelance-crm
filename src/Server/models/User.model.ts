import mongoose, { Schema, Document, SchemaType } from "mongoose";

export interface IUser extends Document {
  _id: any;
  email: string;
  password: string;
  emailVerified: boolean;
  nonce: string;
}

const UserSchema: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    emailVerified: {
      type: Boolean,
      required: true
    },
    nonce: {
      required: true,
      type: String,
      expires: "1d"
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);

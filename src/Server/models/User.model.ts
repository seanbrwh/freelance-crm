import mongoose, { Schema, Document, SchemaType } from "mongoose";

export interface IUser extends Document {
  _id: any;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
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
  }
});

export default mongoose.model<IUser>("User", UserSchema);

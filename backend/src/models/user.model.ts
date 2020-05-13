import { Document, model, Schema } from "mongoose";
// @ts-ignore
import uniqueValidator from "mongoose-unique-validator";

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

interface UserType extends Document {
  name: string;
  email: string;
}

const UserSchema = new Schema({
  name: {
    required: [true, "Name is required."],
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    required: [true, "Email is required."],
    validate: {
      validator: (val: string) => emailRegexp.test(val),
      message: (props) => `${props.value} is not valid email.`,
    },
    type: String,
    unique: true,
    trim: true,
    minlength: 6, // a@b.cd is minimum
    maxlength: 255,
  },
});
UserSchema.plugin(uniqueValidator);

const User = model<UserType>("User", UserSchema);

export { User };

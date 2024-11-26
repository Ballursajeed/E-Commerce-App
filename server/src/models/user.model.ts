import { Model, Document, model, Schema } from "mongoose";

interface IUser extends Document {
   fullName: string;
   email: string;
   username: string;
   password: string;
   avatar?: string;
   isAdmin: Boolean;
   accessToken: string;
}

const userSchema = new Schema<IUser>(
{
  username:{
    required:true,
    unique: true,
    type: String,
  },
  fullName:{
    type:String,
    required: true
  },
  email:{
    required: true,
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  avatar:{
    type: String // cloudinary url
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  accessToken: {
    type: String
  }
},
{
    timestamps: true
}
);

 export const User: Model<IUser> = model("User",userSchema);
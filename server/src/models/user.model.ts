import { Model, Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
   fullName: string;
   email: string;
   username: string;
   password: string;
   avatar?: string;
   isAdmin: Boolean;
   accessToken: string;
   isPasswordCorrect: (password:string) => {};
   generateAccessToken:() => {}
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

userSchema.pre("save",async function (next) {
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,10);
        next() 
    }
    next()
});

userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.isPasswordCorrect = async function(password:string) {
  return await bcrypt.compare(password, this.password)
}


 export const User: Model<IUser> = model("User",userSchema);
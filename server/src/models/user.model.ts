import { Model, Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save",async function (next) {
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,10);
        next() 
    }
    next()
})

 export const User: Model<IUser> = model("User",userSchema);
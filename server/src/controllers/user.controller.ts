import { NextFunction, Request, Response } from "express";
import { AvatarType, MulterRequest } from "../types/types";
import { User } from "../models/user.model";
import { uploadOnCloudinary } from "../utils/cloudinary";

export const userRegister = async(req:MulterRequest,res:Response, next: NextFunction) => {

      try {
         const {fullName, email, username, password} = req.body;
  
         if (!fullName || !email || !username || !password) {
              return res.status(400).json({
                  message: "All fields are required!",
                  success:false
              })
         }
  
         const existedUsername = await User.findOne({username});
  
         if(existedUsername) {
          return res.status(400).json({
              message:"Username is already Exist!",
              success: false
          }) 
        }
  
        const existedEmail = await User.findOne({email});
  
         if(existedUsername) {
          return res.status(400).json({
              message:"Email is already Exist!",
              success: false
          }) 
        }

        let avatar

        if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
            const fileBuffer = req.files.avatar[0].buffer;
            avatar = await uploadOnCloudinary(fileBuffer) as AvatarType;  
        }

        const user = await User.create({
          fullName,
          email,
          username,
          password,
          avatar:  avatar?.url || undefined,
        });
  
        return res.status(201).json({
          message: "User is created Successfully!",
          success: true,
          user
        })
      } catch (error) {

        if (error instanceof Error) {
            // Access error.message safely
            return res.status(500).json({
              message: "Something went wrong during registration!",
              success: false,
              errorMessage: error.message, // Accessible here
            });
          } else {
            // Handle cases where error is not an instance of Error
            return res.status(500).json({
              message: "Unknown error occurred!",
              success: false,
            });
          }
      }

}

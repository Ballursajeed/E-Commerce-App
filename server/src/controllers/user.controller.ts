import { NextFunction, Request, Response } from "express";
import { newUserRequestType } from "../types/types";
import { User } from "../models/user.model";

export const userRegister = async(req:Request,res:Response, next: NextFunction) => {

      try {
         const {fullName, email, username, password,avatar} = req.body;
  
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
  
        const user = await User.create({
          fullName,
          email,
          username,
          password,
          avatar: avatar || undefined,
        });
  
        return res.status(201).json({
          message: "User is created Successfully!",
          success: true,
          user
        })
      } catch (error) {

        return res.status(500).json({
            message: "Something went wrong while Registering the user!",
            success: false,
            errorMessage: error 
        })

      }

}

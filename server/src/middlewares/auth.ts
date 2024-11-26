import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";
import { decodeMiddlewareType, middlewareRequest } from "../types/types";


export const validateUser = async(req:middlewareRequest,res:Response,next:NextFunction) => {

    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","");

    if (!token) {
        return res.status(400).json({
            message:"Unauthorized Request!",
            success: false
        })
    }

    const decode = jwt.verify(token,process.env.ACCESS_TOKEN as string) as decodeMiddlewareType;

    const user = await User.findById(decode._id).select("-password");

    if (!user) {
        return res.status(400).json({
            message: "Invalid Access Token",
            status: 400,
         }) 
      }

    req.user = user?._id as string;
    
  next()

}
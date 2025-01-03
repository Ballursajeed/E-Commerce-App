import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";
import { decodeMiddlewareType, middlewareIsAdminRequest, middlewareValidateUserRequest } from "../types/types";


export const validateUser = async(req:middlewareValidateUserRequest,res:Response,next:NextFunction) => {

    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","");

    if (!token) {
        return res.status(400).json({
            message:"Please Login first!",
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

export const isAdmin = async(req:middlewareIsAdminRequest,res:Response,next:NextFunction) => {

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

    if(user.isAdmin === false){
       return res.status(400).json({
            message:"Unauthorized Request! You're not Admin",
            success: false
       })
    }
    
    if (user.isAdmin === true) {
        req.user = user 
        req.userId = user._id
        next()
    }

}

export const isSeller = async(req:middlewareIsAdminRequest,res:Response,next:NextFunction) => {

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


    if (user.role === 'seller' || user.role === 'admin') {
        req.user = user 
        req.userId = user._id
        next()
    } else {
        return res.status(400).json({
            message: "Sorry You're not a Seller",
            status: 400,
         }) 
    }
}
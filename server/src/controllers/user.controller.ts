import { CookieOptions, NextFunction, Request, Response } from "express";
import { AvatarType, loginUserRequest, middlewareValidateUserRequest, MulterRequest } from "../types/types";
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
            return res.status(500).json({
              message: "Something went wrong during registration!",
              success: false,
              errorMessage: error.message, 
            });
          } else {
            return res.status(500).json({
              message: "Unknown error occurred!",
              success: false,
            });
          }
      }

}

export const userLogin = async(req: Request,res: Response, next:NextFunction) => {

  const { username,password } = req.body;

  console.log("username",username);
  console.log("password:",password);
  
  if (!username || !password) {
    return res.status(400).json({
      message: "All fields are required!",
      success:false
  })
  }

  const user = await User.findOne({username});

  if (!user) {
    return res.status(404).json({
      message: "Username not found",
      success:false
  })
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
     return res.status(400).json({
       message: "username or password is InCorrect!",
       success: false
     })
  }
        const accessToken = user.generateAccessToken();
    
        user.accessToken = accessToken as string;
    
        await user.save({validateBeforeSave: false})
        
        const option:CookieOptions = {
          secure: true,
          sameSite: 'none', // Corrected the case
          path: '/',
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        };
    
        return res
          .cookie("accessToken", accessToken, option)
          .status(200)
          .json({
            message: "User logged in successfully!",
            success: true,
            user,
          });


}

export const userLogout = async(req:middlewareValidateUserRequest, res:Response, next:NextFunction) => {
  const id = req.user;

  const user = await User.findByIdAndUpdate(id,{
    $unset:{
        accessToken: null
    },
},
   {
      new: true
   }
)
 res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true        
});

res.status(200).json({
    message: "User LoggedOut Successfully!",
    status:200,
    user
})

}
export const checkAuth = async(req:middlewareValidateUserRequest,res:Response) => {
  try {
      const user = req.user; 
      if (!user) {
          return res.status(401).json({ message: "Not authenticated" });
      }
      res.status(200).json({ 
          message:"User Authenticated",
          success: true,
          user
       });
  } catch (error) {
      res.status(500).json({ message: "Server Error" });
  }
}
  
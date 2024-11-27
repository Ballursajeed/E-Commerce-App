import exp from "constants";
import { Request } from "express";
import { IUser } from "../models/user.model";

// Extend Multer's File type
export interface MulterRequest extends Request {
    files: {
      avatar?: Express.Multer.File[]; // The avatar field will be an array of files
    };
    body: {
        fullName: string;
        email: string;
        username: string;
        password: string;
      };
  }

  export interface newProductRequest extends Request {
    files: {
      image?: Express.Multer.File[]; // The avatar field will be an array of files
    };
    body: {
      name: string;
      description: string;
      category: string;
      price: number;
      stocks: number;
      owner: Document;
      };
      user: IUser;
      userId: string;
  }

export interface AvatarType {
    
        asset_id: string,
        public_id: string,
        version: number,
        version_id: string,
        signature: string,
        width: number,
        height: number,
        format: string,
        resource_type: string,
        created_at: string,
        tags: any[],
        bytes: number,
        type: string,
        etag: string,
        placeholder: boolean
        url: string,
        secure_url: string,
        folder:string,
        original_filename: string,
        api_key: string
      
      
}

export interface loginUserRequest {
  body:{
    username:string;
  password: string;
  }
}


export interface middlewareValidateUserRequest extends Request{
  user: string
}

export interface middlewareIsAdminRequest extends Request{
  user: IUser;
  userId: string;
}

export interface decodeMiddlewareType {
  _id: string; iat: number; exp: number;
}

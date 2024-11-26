import { NextFunction, Request, Response } from "express";
import { AvatarType, newProductRequest } from "../types/types";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { Product } from "../models/product.model";

export const addProduct = async(req:newProductRequest, res: Response, next:NextFunction) => {
    const { name, price, category, description, stocks } = req.body

    if (!name || !price || !category || !description || !stocks) {
        return res.status(400).json({
            message: "All fields are required!",
            success: false
        })
    }
  
    let image;

    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) { // image uploading
        const fileBuffer = req.files.image[0].buffer;
        image = await uploadOnCloudinary(fileBuffer) as AvatarType;  
    }

    const product = await Product.create({
        name,
        price,
        category,
        description,
        stocks,
        owner: req.user,
        image: image?.url || undefined
    });

    return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
        product
      });
}


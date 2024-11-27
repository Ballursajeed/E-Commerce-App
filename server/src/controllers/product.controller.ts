import { NextFunction, Request, Response } from "express";
import { AvatarType, newProductRequest } from "../types/types";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { Product } from "../models/product.model";

export const getAllProducts = async(req:newProductRequest, res: Response, next:NextFunction) => {
   
    const products = await Product.find();

    return res.status(200).json({
       message: "Products Fetched Successfully!",
       success: true,
       products
    })
}

export const getSingleProduct = async(req:newProductRequest, res: Response, next:NextFunction) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Please Pass Id",
            success: false
        })
    }

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            message:"Product Not Found!",
            success: false
        })
    }

    return res.status(200).json({
        message: "Product fetched Successfully!",
        success:true,
        product
    })

}

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

export const updateProduct = async(req:newProductRequest,res: Response, next:NextFunction) => {
    const { name, price, category, description, stocks } = req.body;
    const { id } = req.params;
  
    let image;

    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) { // image uploading
        const fileBuffer = req.files.image[0].buffer;
        image = await uploadOnCloudinary(fileBuffer) as AvatarType;  
    }

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not Found!",
            success: false
        })
    }

    if(description) product.description = description;
    if (name) product.name = name;
    if (price) product.price = price;
    if (stocks) product.stocks = stocks;
    if (category) product.category = category;
    if(image) product.image = image.url;
    

    await product.save()

    return res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
        product
      });
}

export const deleteProduct = async(req:Request,res: Response, next:NextFunction) => {
   const { id } = req.params;

   if (!id) {
      return res.status(400).json({
        message:"Please Pass ID!",
        success: false
      })
   }

   const product = await Product.findById(id);

   if (!product) {
     return res.status(404).json({
        message: "Product Not Found!",
        success: false
     })
   }

   await Product.findByIdAndDelete(id);

   return res.status(200).json({
    message: "Product Deleted Successfully!",
    success:true
   })

}
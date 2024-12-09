import { NextFunction, Request, Response } from "express";
import { AvatarType, newProductRequest } from "../types/types";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { IProduct, Product } from "../models/product.model";
import { IUser, User } from "../models/user.model";

export const getAllProducts = async(req:newProductRequest, res: Response, next:NextFunction) => {
   
    try {
        const products = await Product.find();
    
        return res.status(200).json({
           message: "Products Fetched Successfully!",
           success: true,
           products
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong, while fetching products!",
            success: false,
            error
         })
    }
}

export const getSearchResults = async(req:Request,res:Response) => {
   try {
     const {search} = req.query;
 
     if (!search) {
         res.status(400).json({
             message:"Search Query is Required!",
             success: false
         })
     } 
 
     const results = await Product.find({
         name: { $regex: search, $options: "i" }, // 'i' makes it case-insensitive
       });
 
     if (!results) {
         res.status(404).json({
             message: "no Results Found!",
             success: false,
             products: [],
         })
     } 
 
     res.status(200).json({
         message: "Results Fetched!",
         success: true,
         products: results
     })
   } catch (error) {
     res.status(500).json({
        message: "Something Went Wrong!",
        success: false,
        error
     })
   }

}

export const getSingleProduct = async(req:newProductRequest, res: Response, next:NextFunction) => {
    try {
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
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong,while fetching a product!",
            success:false,
            error
        })
    }

}

export const getLatestProducts = async (req: newProductRequest, res:Response, next:NextFunction) => {

    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
  
      return res.status(200).json({
        success: true,
        products,
      });
}
  
export const getAllCategories = async(req: newProductRequest, res:Response, next:NextFunction) => {
   const categories = await Product.distinct("category");

  return res.status(200).json({
    message: "Category fetched Successfully!",
    success: true,
    categories,
  });
}

export const getProductByCategory = async(req:Request,res:Response) => {
    const { category } = req.params;

    const products = await Product.find({category});

    if (!products) {
        res.status(404).json({
            message: "Products Not Found!",
            success: false,
            products,
        })
    }

    res.status(200).json({
        message: "Products Fetched!",
        success: true,
        products
    })

}
 
export const getAdminProducts = async(req: newProductRequest, res:Response, next:NextFunction) => {
    const productsId = req.user.products;

    if (productsId.length === 0) {
        return res.status(404).json({
            message: "You don not have any Products",
            status: 404
        })
    }

    const products = await Product.find({
        _id: { $in: productsId },
      })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order (most recent first)
        .lean();
     
       let productWithUser = [];
       for (let i = 0; i < products.length; i++) {
         let product = products[i] as IProduct ;
         let user:IUser
         if (product?.owner) {
           user = await User.findById(product.owner).lean() as IUser;
           product.owner = user;
           productWithUser.push(product);
         }
       }      
 
 
   res.status(200).json({
     message:"Fetched MY Blogs!",
     status: 200,
     products: productWithUser
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

    const id = req.userId 

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found!",
            success: false
        })
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

   user.products.push(product);
   await user.save({ validateBeforeSave: false })

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
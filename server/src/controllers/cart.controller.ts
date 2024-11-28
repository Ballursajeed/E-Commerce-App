import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.models";
import { addCartTypes } from "../types/types";
import mongoose, { ObjectId } from "mongoose";

export const addItems = async(req:addCartTypes, res:Response, next:NextFunction) => {
       try {
        const { id,stocks } = req.body;
 
        const product = await Product.findById(id);
 
        if (!product) {
         return res.status(404).json({
             message: "Product Not Found!",
             success: false
         });
        }
 
        if (product.stocks < 0) {
         return res.status(409).json({
             message: "Product is out of Stocks!",
             success: false
         })
        }
 
        if (stocks > product.stocks) {
         return res.status(409).json({
             message: `only ${product.stocks} stocks are left`,
             success: false
         })
        }
        let items = [];
        items.push(product)
        let total = 0;
 
        const userCart = await Cart.findOne({customer: req.user});
       
        if (!userCart) { // if user's first cart
            const cartItem = await Cart.create({
                        customer: req.user,
                        items,
                        total: product.price*stocks
                    });
        
                    product.stocks = product.stocks - stocks;
                    await product.save({validateBeforeSave: false});
        
                    return res.status(201).json({
                        message: "Cart Created Successfully!",
                        success: true,
                        cart: cartItem
                    });
        }

        const existingProductId = userCart.items.find((item) =>  {
           return item.toString() === new mongoose.Types.ObjectId(id).toString()
        });

        //if the product already exists in cart
        if (existingProductId) {
            product.stocks --;
            await product.save({validateBeforeSave: false});

            total = userCart.total as number
            total += product.price * stocks;
            userCart.total = total;
           await userCart.save({validateBeforeSave: false});

        return res.status(201).json({
         message: "Cart Updated Successfully!",
         success: true,
         cart: userCart
        })
        }

        userCart.items.push(product._id as mongoose.Types.ObjectId);

        total = userCart.total as number
        total += product.price * stocks;
        userCart.total = total;
        await userCart.save({validateBeforeSave: false});

        product.stocks = product.stocks - stocks;
       await product.save({validateBeforeSave: false});

        return res.status(201).json({
         message: "Cart Added Successfully!",
         success: true,
         cart: userCart
        })
       } catch (error) {
        return res.status(500).json({
            message:"Something went Went Wrong while adding to cart!",
            success: false
        })
       }

}
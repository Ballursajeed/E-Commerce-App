import {  Response } from "express";
import { newOrderRequestType } from "../types/types";
import { Order } from "../models/order.model";
import { Cart } from "../models/cart.models";
import { User } from "../models/user.model";

export const newOrder = async(req:newOrderRequestType,res:Response) => {
   try {
     const { address,country,state,district,name,pincode,paymentMethod } = req.body;
 
     if (!address || !country || !state || !district || !name || !pincode || !paymentMethod) {
         return res.status(400).json({
             message: "All Fields are Required!",
             success: false
         });
     }
 
     const userCart = await Cart.findOne({customer: req.user});
 
     if (!userCart) {
         return res.status(404).json({
             message: "User's cart not Found",
             success: false
         });
     }
 
     const order = await Order.create({
         address,
         country,
         state,
         district,
         name,
         pincode,
         paymentMethod,
         totalAmount: userCart.total,
         items: userCart.items,
         customer: req.user,
 
     });
 
     return res.status(201).json({
         message: "Order Created Successfully!",
         success: true,
         order
     });
   } catch (error) {
     return res.status(500).json({
        message:"Something Went Wrong!",
        success: false,
        error
     })
   }
    
}

export const getMyOrders = async(req:newOrderRequestType,res:Response) => {
try {
    
        const order = await Order.findOne({customer: req.user});
    
        if(!order) {
            return res.status(404).json({
                message: "Order not Found!",
                success: false
            })
        }
    
        return res.status(200).json({
            message: "Order Fetched!",
            success: true,
            order
        })
    
} catch (error) {
    return res.status(500).json({
        message:"Something Went Wrong!",
        success: false,
        error
     })
}
}

//Admin use
export const getSingleOrder = async(req:newOrderRequestType,res:Response) => { //admin only
    try {
        
     const { id } = req.params;

     const user = await User.findById(id);

     if (!user) {
        return res.status(500).json({
            message:"User not Found!",
            success: false,
         })
     }

     const order = await Order.findOne({customer: user});
    
        if(!order) {
            return res.status(404).json({
                message: "Order not Found!",
                success: false
            })
        }
    
        return res.status(200).json({
            message: "User's Order Fetched!",
            success: true,
            order
        })

    } catch (error) {
        return res.status(500).json({
            message:"Something Went Wrong!",
            success: false,
            error
         })
    }
}

export const getAllOrders = async(req:newOrderRequestType,res:Response) => { //admin only
   try {
    
    const orders = await Order.find({});

    return res.status(200).json({
        message: "All Orders Fetched!",
        success: true,
        orders
    })

   } catch (error) {
    return res.status(500).json({
        message:"Something Went Wrong!",
        success: false,
        error
     })
   }    
}

export const processOrder = async(req:newOrderRequestType,res:Response) => {
      try {
        
        const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({
        message: "Order Not Found!",
        success: false
    })
  }

  switch (order.status) {
    case "pending":
      order.status = "shipped";
      break;

    case "shipped":
      order.status = "delivered";
      break;

    default:
      order.status = "delivered";
      break;
  }

  await order.save();

  return res.status(200).json({
    success: true,
    message: "Order Processed Successfully",
    order
  });

      } catch (error) {
        return res.status(500).json({
            message:"Something Went Wrong!",
            success: false,
            error
         })
      }
}

export const deleteOrder = async(req:newOrderRequestType,res:Response) => {
    try {
        
       const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found!",
                success: false
            })
        }

        await order.deleteOne();

        return res.status(200).json({
          success: true,
          message: "Order Deleted Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            success: false,
            error
        })
    }
}
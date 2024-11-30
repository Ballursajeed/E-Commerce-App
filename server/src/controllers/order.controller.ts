import {  Response } from "express";
import { newOrderRequestType } from "../types/types";
import { Order } from "../models/order.model";
import { Cart } from "../models/cart.models";
import { User } from "../models/user.model";

import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

export const newOrder = async(req:newOrderRequestType,res:Response) => {
   try {
    const { address, country, state, district, name, pincode, paymentMethod } = req.body;

    // Validate input fields
    if (!address || !country || !state || !district || !name || !pincode || !paymentMethod) {
      return res.status(400).json({
        message: "All Fields are Required!",
        success: false,
      });
    }

    // Check if user cart exists
    const userCart = await Cart.findOne({ customer: req.user });

    if (!userCart) {
      return res.status(404).json({
        message: "User's cart not Found",
        success: false,
      });
    }

    let totalAmount = userCart.total; // Assuming `total` is stored in the cart model

    if (!totalAmount) {
        totalAmount = 0;
    }

    // Handle Stripe payment for "card" payment method
    if (paymentMethod === "card") {
      // Create a Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, // Convert to smallest currency unit (e.g., cents for USD)
        currency: "inr", 
        payment_method_types: ["card"],
        metadata: {
          customerName: name,
          address: `${address}, ${district}, ${state}, ${country}, ${pincode}`,
          items: JSON.stringify(userCart.items), // Optionally include cart items
        },
      });

      // Create an order with "pending" status
      const order = await Order.create({
        address,
        country,
        state,
        district,
        name,
        pincode,
        paymentMethod,
        totalAmount,
        items: userCart.items,
        customer: req.user,
        status: "pending", // Set initial status to "pending"
      });

      return res.status(201).json({
        message: "Order Created Successfully! Proceed to Payment",
        success: true,
        clientSecret: paymentIntent.client_secret, // Send this to the frontend
        order,
      });
    }

    // For other payment methods (e.g., UPI, cash on delivery)
    const order = await Order.create({
      address,
      country,
      state,
      district,
      name,
      pincode,
      paymentMethod,
      totalAmount,
      items: userCart.items,
      customer: req.user,
      status: paymentMethod === "cash" ? "pending" : "processing", // Set status accordingly
    });

    return res.status(201).json({
      message: "Order Created Successfully!",
      success: true,
      order,
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
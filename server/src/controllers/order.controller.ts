import {  Response } from "express";
import { newOrderRequestType } from "../types/types";
import { Order } from "../models/order.model";
import { Cart } from "../models/cart.models";

export const newOrder = async(req:newOrderRequestType,res:Response) => {
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
    
}
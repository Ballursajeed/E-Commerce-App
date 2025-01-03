import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
             type:mongoose.Schema.Types.ObjectId,
             ref: "Product"
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["card", "cash", "UPI"],
            required: true,
        },
        name:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        district:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        pincode:{
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model("Order",orderSchema);
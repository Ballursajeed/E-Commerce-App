import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        items:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Products"
            }
        ],
        total: Number
    },
    {
        timestamps: true
    }
);

export const Cart = mongoose.model("Cart",cartSchema);
import { Model, model, Schema, Document } from "mongoose";

interface IProduct extends Document {
    name: string;
    description: string;
    category: string;
    rating: number;
    price: number;
    stocks: number;
    owner: Document;
}

const productSchema = new Schema<IProduct>(
{
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    stocks:{
        type: Number,
        default: 1,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
});

const Product:Model<IProduct> = model("Product",productSchema)
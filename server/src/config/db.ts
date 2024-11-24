import mongoose, { mongo } from "mongoose"

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/EcommerceApp`);
        console.log(".....MONGO DB is Connected!!!, DB host:",connectionInstance.connection.host);
                
    } catch (error) {
        console.log("MONGO DB CONNECTION ERROR!!: ",error);
    }
}

export {
    connectDB
}
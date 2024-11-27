import  app  from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
dotenv.config()

connectDB()
const port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log("Server is running on port ",port);
})
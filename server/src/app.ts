import express,{Express,Request,Response} from "express"
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['https://e-commerce-app-six-plum.vercel.app/',"http://localhost:5173"],
    credentials: true,  // Allow cookies and credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(morgan("dev"))

app.get("/",(req:Request,res:Response) => {
    res.send("Hello Friend")
})

import userRouter from "./routes/user.routes"
import productRouter from "./routes/product.route"
import cartRouter from "./routes/cart.routes";
import orderRouter from "./routes/order.routes";       

app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/order",orderRouter)

export default app
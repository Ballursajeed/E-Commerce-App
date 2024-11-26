import express,{Express,Request,Response} from "express"
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(morgan("dev"))

app.get("/",(req:Request,res:Response) => {
    res.send("Hello Friend")
})

import userRouter from "./routes/user.routes"
import productRouter from "./routes/product.route"

app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRouter)

export default app
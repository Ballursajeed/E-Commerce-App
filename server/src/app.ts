import express,{Express,Request,Response} from "express"
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.get("/",(req:Request,res:Response) => {
    res.send("Hello Friend")
})

import userRouter from "./routes/user.routes"
app.use("/api/v1/user",userRouter)

export default app
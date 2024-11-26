import express from "express";
import { userLogin, userRegister } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const route = express.Router()

route.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount: 1
    }
]),userRegister as unknown as express.RequestHandler);

route.route("/login").post(userLogin as unknown as express.RequestHandler)
   
export default route
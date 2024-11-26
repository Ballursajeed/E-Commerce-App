import express from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import { validateUser } from "../middlewares/auth";

const route = express.Router()

route.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount: 1
    }
]),userRegister as unknown as express.RequestHandler);

route.route("/login").post(userLogin as unknown as express.RequestHandler)
route.route("/logout").post(validateUser as unknown as express.RequestHandler,userLogout as unknown as express.RequestHandler)
   
export default route
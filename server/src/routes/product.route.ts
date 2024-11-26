import express from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import { validateUser } from "../middlewares/auth";
import { addProduct } from "../controllers/product.controller";

const route = express.Router()

route.route("/newProduct").post(upload.fields([
    {
        name:"image",
        maxCount: 1
    }
]),addProduct as unknown as express.RequestHandler);

export default route
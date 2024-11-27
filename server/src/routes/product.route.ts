import express from "express";
import { upload } from "../middlewares/multer.middleware";
import { isAdmin } from "../middlewares/auth";
import { addProduct, deleteProduct, updateProduct } from "../controllers/product.controller";

const route = express.Router()

route.route("/newProduct").post(isAdmin as unknown as express.RequestHandler,upload.fields([
    {
        name:"image",
        maxCount: 1
    }
]),addProduct as unknown as express.RequestHandler);
route.route("/update/:id").post(isAdmin as unknown as express.RequestHandler,upload.fields([
    {
        name:"image",
        maxCount: 1
    }
]), updateProduct as unknown as express.RequestHandler);

route.route("/delete/:id").delete(isAdmin as unknown as express.RequestHandler, deleteProduct as unknown as express.RequestHandler)

export default route
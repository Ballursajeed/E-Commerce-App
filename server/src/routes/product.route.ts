import express from "express";
import { upload } from "../middlewares/multer.middleware";
import { isAdmin } from "../middlewares/auth";
import { addProduct, deleteProduct, getAdminProducts,getSearchResults,getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, updateProduct, getProductByCategory, getProductByPrice } from "../controllers/product.controller";

const route = express.Router()

route.route("/getAllProducts").get(getAllProducts as unknown as express.RequestHandler)
route.route("/search").get(getSearchResults as unknown as express.RequestHandler)
route.route("/getSingleProduct/:id").get(getSingleProduct as unknown as express.RequestHandler)
route.route("/getLatestProducts").get(getLatestProducts as unknown as express.RequestHandler)
route.route("/getAllCategories").get(getAllCategories as unknown as express.RequestHandler)
route.route("/getProductByCategory/:category").get(getProductByCategory as unknown as express.RequestHandler)
route.route("/price/:sort").get(getProductByPrice as unknown as express.RequestHandler)
route.route("/getAdminProducts").get(isAdmin as unknown as express.RequestHandler,getAdminProducts as unknown as express.RequestHandler )

route.route("/newProduct").post(isAdmin as unknown as express.RequestHandler,upload.fields([
    {
        name:"image",
        maxCount: 1
    }
]),addProduct as unknown as express.RequestHandler);
route.route("/update/:id").put(isAdmin as unknown as express.RequestHandler,upload.fields([
    {
        name:"image",
        maxCount: 1
    }
]), updateProduct as unknown as express.RequestHandler);

route.route("/delete/:id").delete(isAdmin as unknown as express.RequestHandler, deleteProduct as unknown as express.RequestHandler)

export default route
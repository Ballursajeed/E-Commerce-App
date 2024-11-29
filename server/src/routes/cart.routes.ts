import express from "express";
import { addItems, deleteItem, getAllCart } from "../controllers/cart.controller";
import { validateUser } from "../middlewares/auth";

const route = express.Router()

route.route("/getCart").get(validateUser as unknown as express.RequestHandler, getAllCart as unknown as express.RequestHandler);

route.route("/addItems").post(validateUser as unknown as express.RequestHandler,addItems as unknown as express.RequestHandler)
route.route("/delete/:id").post(validateUser as unknown as express.RequestHandler,deleteItem as unknown as express.RequestHandler)
   
export default route
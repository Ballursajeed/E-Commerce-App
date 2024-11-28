import express from "express";
import { addItems } from "../controllers/cart.controller";
import { validateUser } from "../middlewares/auth";

const route = express.Router()

route.route("/addItems").post(validateUser as unknown as express.RequestHandler,addItems as unknown as express.RequestHandler)
   
export default route
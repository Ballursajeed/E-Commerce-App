import express from "express";
import { validateUser } from "../middlewares/auth";
import { newOrder } from "../controllers/order.controller";

const route = express.Router()

route.route("/add").post(validateUser as unknown as express.RequestHandler, newOrder as unknown as express.RequestHandler);
   
export default route
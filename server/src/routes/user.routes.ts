import express from "express";
import { userRegister } from "../controllers/user.controller";

const route = express.Router()

route.post("/register",userRegister as unknown as express.RequestHandler)

export default route
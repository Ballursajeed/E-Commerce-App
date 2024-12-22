import express from "express";
import { becomeSeller, checkAuth, getCurrentMonthUsers, userLogin, userLogout, userRegister } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import { isAdmin, validateUser } from "../middlewares/auth";

const route = express.Router()

route.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount: 1
    }
]),userRegister as unknown as express.RequestHandler);

route.route("/login").post(userLogin as unknown as express.RequestHandler)
route.route("/logout").post(validateUser as unknown as express.RequestHandler,userLogout as unknown as express.RequestHandler)
route.route("/become-seller").post(becomeSeller as unknown as express.RequestHandler)
route.route("/me").get(validateUser as unknown as express.RequestHandler,checkAuth as unknown as express.RequestHandler)

//admin routes
route.route("/admin/thisMonthUsers").get(validateUser as unknown as express.RequestHandler,
    isAdmin as unknown as express.RequestHandler,
    getCurrentMonthUsers as unknown as express.RequestHandler)

export default route
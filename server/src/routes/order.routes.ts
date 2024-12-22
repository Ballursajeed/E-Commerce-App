import express from "express";
import { isAdmin, validateUser } from "../middlewares/auth";
import { deleteOrder, getAllOrders, getCurrentMonthRevenueAndTransactions, getMyOrders, getSingleOrder, newOrder, processOrder } from "../controllers/order.controller";

const route = express.Router()

route.route("/add")
 .post(
    validateUser as unknown as express.RequestHandler,  
    newOrder as unknown as express.RequestHandler);

route.route("/my")
 .get(
    validateUser as unknown as express.RequestHandler, 
    getMyOrders as unknown as express.RequestHandler);

//admin route    
route.route("/single/:id")
 .get(
    validateUser as unknown as express.RequestHandler, 
    isAdmin as unknown as express.RequestHandler,
    getSingleOrder as unknown as express.RequestHandler);

route.route("/all")
.get(
    validateUser as unknown as express.RequestHandler, 
    isAdmin as unknown as express.RequestHandler,
    getAllOrders as unknown as express.RequestHandler);

route.route("/process/:id")
 .put(
    validateUser as unknown as express.RequestHandler, 
    isAdmin as unknown as express.RequestHandler,
    processOrder as unknown as express.RequestHandler);

route.route("/delete/:id")
 .delete(
    validateUser as unknown as express.RequestHandler, 
    isAdmin as unknown as express.RequestHandler,
    deleteOrder as unknown as express.RequestHandler);


 //admin routes
 route.route('/admin/thisMonthRevenue').get(validateUser as unknown as express.RequestHandler, 
    isAdmin as unknown as express.RequestHandler,
    getCurrentMonthRevenueAndTransactions as unknown as express.RequestHandler);
 route.route('/admin/thisMonthTransactions').get(validateUser as unknown as express.RequestHandler, 
    isAdmin as unknown as express.RequestHandler,
    getCurrentMonthRevenueAndTransactions as unknown as express.RequestHandler);

   
export default route
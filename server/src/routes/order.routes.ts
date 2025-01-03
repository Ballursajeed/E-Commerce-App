import express from "express";
import { isAdmin, validateUser } from "../middlewares/auth";
import { deleteOrder, getAllMonthsRevenue, getAllOrders, getAllTransactions, getCurrentMonthRevenueAndTransactions, getCustomers, getMyOrders, getSingleOrder, getTopTransactions, newOrder, processOrder } from "../controllers/order.controller";

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

 //dashboard routes
 route.route('/admin/thisMonthRevenueAndTransacions').get(validateUser as unknown as express.RequestHandler, 
   isAdmin as unknown as express.RequestHandler,
   getCurrentMonthRevenueAndTransactions as unknown as express.RequestHandler);

route.route('/admin/allMonthRevenue').get(validateUser as unknown as express.RequestHandler, 
   isAdmin as unknown as express.RequestHandler,
   getAllMonthsRevenue as unknown as express.RequestHandler);

route.route('/admin/allTransactions').get(validateUser as unknown as express.RequestHandler, 
   isAdmin as unknown as express.RequestHandler,
   getAllTransactions as unknown as express.RequestHandler);

route.route('/admin/topTransactions').get(validateUser as unknown as express.RequestHandler, 
   isAdmin as unknown as express.RequestHandler,
   getTopTransactions as unknown as express.RequestHandler);   

route.route('/admin/customers').get(validateUser as unknown as express.RequestHandler, 
   isAdmin as unknown as express.RequestHandler,
   getCustomers as unknown as express.RequestHandler);  

//seller routes



export default route

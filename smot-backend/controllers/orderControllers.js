import { ObjectId } from "mongodb";
import Order from './../models/orderModel.js';
import Customer from "./../models/customerModel.js";

 const fetchOrders = async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    try
    {
        if (isNaN(limit) || limit < 0) {
            const error = new Error("Invalid limit value");
                error.status = 400;
                next(error);
                return
        }
        

        const orders = await Order.find().limit(limit);
        return res.status(200).json(orders);
    }
    catch(err){
        const error = new Error("Error fetching orders:", err)
        next(error);
    }
};

 const fetchOrder = async (req, res, next) => {
    try{
        if (!ObjectId.isValid(req.params.id)) {
            const error = new Error("Invalid ID format")
            error.status = 400;
            next(error);
            return;
        }

        const orderId = new ObjectId(req.params.id); 
        const ordersData = await Order.findOne({ _id: orderId });


        if (!ordersData) {
            const error = new Error("Order not found");
            error.status = 400;
            next(error);
            return;
        }

        ordersData._id = ordersData._id.toString();
        return res.status(200).json(ordersData);

    }
    catch(err){
        const error = new Error("Error fetching order:", err)
        next(error);
    }
};

const newOrder = async (req, res, next) => {
    try {

        const customerId = new ObjectId(req.body['customerId']); 
        const customerData = await Customer.findOne({ _id: customerId });
        if (customerData && (!customerData.hasOwnProperty("dateOfFirstOrder") || customerData.dateOfFirstOrder)) {
            const result = await Customer.updateOne(
                { _id: customerId }, 
                { $set: { dateOfFirstOrder: Date.now() } }
            );
        }

        const newOrd = new Order(req.body);
        await newOrd.save();
        return res.status(201).send("Received");
    } catch (err) {
        const error = new Error("Error inserting order: " + err.message);
        error.status = 500;
        next(error); 
    }
};

const validateOrder = (req, res, next) => {
    const { customerId, order, totalCost} = req.body;

    if (!customerId || !order || !totalCost) {
        const error = new Error("Missing required fields: customerId, order, totalCost");
        error.status = 404;
        next(error);
        return;
    }

    next();
}

const updateOrder = async (req, res, next) => {
    
    try{
        if (!ObjectId.isValid(req.params.id)) {
            const error = new Error("Invalid ID format")
            error.status = 400;
            next(error);
            return;
        }

        const orderId = new ObjectId(req.params.id); 
        const {parameter, value} = req.body;

        if(!orderId || !parameter || !value) {
            const error = new Error("Missing required fields: orderId, parameter, value");
            error.status = 404;
            next(error);
            return;
        }
        
        const orderData = await Order.findOne({ _id: orderId });
        if (orderData) {
            const result = await Order.updateOne(
                { _id: orderId }, 
                { $set: { [parameter]: value } }
            );
            res.status(200).json({"message":"updated"});
        }
        else{
            const error = new Error("Incorrect orderId.");
            error.status = 404;
            next(error);
        }
    }
    catch (err) {
        const error = new Error("Error updating order status: " + err.message);
        error.status = 500;
        next(error); 
    }    
    
}

export default {fetchOrders, fetchOrder, newOrder, validateOrder, updateOrder};

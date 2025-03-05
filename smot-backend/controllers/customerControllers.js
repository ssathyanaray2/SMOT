import { ObjectId } from "mongodb";
import Customer from '../models/customerModel.js';

 const fetchCustomers = async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    try
    {
        if (isNaN(limit) || limit < 0) {
            const error = new Error("Invalid limit value");
                error.status = 400;
                next(error);
        }

        const customer = await Customer.find().limit(limit);
        return res.status(200).json(customer);
    }
    catch(err){
        const error = new Error("Error fetching customer:", err)
        next(error);
    }
};

 const fetchCustomer = async (req, res, next) => {
    try{
        if (!ObjectId.isValid(req.params.id)) {
            const error = new Error("Invalid ID format")
            error.status = 400;
            next(error);
        }

        const customerId = new ObjectId(req.params.id); 
        const customerData = await Customer.findOne({ _id: customerId });


        if (!customerData) {
            const error = new Error("Customer not found");
            error.status = 400;
            next(error);
        }

        customerData._id = customerData._id.toString();
        return res.status(200).json(customerData);

    }
    catch(err){
        const error = new Error("Error fetching customer:", err)
        next(error);
    }
};

const newCustomer = async (req, res, next) => {
    try {

        const newCus = new Customer(req.body);
        await newCus.save();
        return res.status(201).send("Received");
    } catch (err) {
        const error = new Error("Error inserting customer: " + err.message);
        error.status = 500;
        next(error); 
    }
};

export default {fetchCustomers, fetchCustomer, newCustomer};

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    order: { type: Object, required: true },
    status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    totalCost: {type: Number, required: true},
    comments: {type: String},
    deliveryAdress: {type: String}
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
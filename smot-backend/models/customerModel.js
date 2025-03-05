import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	email: { type: String },
	dateOfFirstOrder: { type: Date }, //update it when order is recieved.
	totalPurchased: { type: Number },
	comments: { type: String},

});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
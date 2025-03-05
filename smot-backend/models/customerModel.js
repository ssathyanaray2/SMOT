import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
	Name: { type: String, required: true },
	Address: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	Email: { type: String },
	dateOfFirstOrder: { type: Date }, //update it when order is recieved.
	totalPurchased: { type: Number },
	Comments: { type: String},

});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
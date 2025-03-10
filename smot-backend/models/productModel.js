import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    status: { type: String, required: true },
    cost: {type: Number, required: true},
    stock: {type: Number},
});

const Product = mongoose.model('Product', productSchema);

export default Product;
import Product from '../models/productModel.js'

const fetchProducts = async (req, res, next) => {
    
    try
    {
        const products = await Product.find();
        return res.status(200).json(products);
    }
    catch(err){
        const error = new Error("Error fetching products:", err)
        next(error);
    }
};

export default {fetchProducts};
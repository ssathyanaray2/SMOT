import express from 'express';
import productControllers from './../controllers/productControllers.js';
const router = express.Router();

router
.get('/', productControllers.fetchProducts);

export default router;
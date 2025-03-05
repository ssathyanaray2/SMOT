import express from 'express';
import orderControllers from './../controllers/orderControllers.js';
const router = express.Router();

router
.get('/', orderControllers.fetchOrders)
.post('/', orderControllers.validateOrder, orderControllers.newOrder);

router.get('/:id', orderControllers.fetchOrder);


export default router;
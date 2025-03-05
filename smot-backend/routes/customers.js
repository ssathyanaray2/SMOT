import express from 'express';
import customerControllers from './../controllers/customerControllers.js'
const router = express.Router();

router
.get('/', customerControllers.fetchCustomers)
.post('/', customerControllers.newCustomer);

router
.get('/:id', customerControllers.fetchCustomer)
// .post('/:id', customerControllers.updateOrder);

export default router;
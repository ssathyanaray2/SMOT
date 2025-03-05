import express from 'express';
import customerControllers from './../controllers/customerControllers.js'
const router = express.Router();

router.get('/:id', customerControllers.fetchCustomer);

router.get('/', customerControllers.fetchCustomers);

router.post('/', customerControllers.newCustomer);

export default router;
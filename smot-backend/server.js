import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import orders from './routes/orders.js';
import customers from './routes/customers.js';
import logger from './middleware/logger.js';
import errorhandler from './middleware/error.js';
import cors from 'cors';
import connectDB from './database/dbConnection.js';

connectDB();
const PORT = process.env.PORT || 8000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
    res.send("server is running ....");
});

app.use('/api/orders', orders);
app.use('/api/customers', customers);

app.use(errorhandler);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.....`)
});


import express from 'express';
import authController from './controller/auth/authController.js';
import expenseController from './controller/expense/expenseController.js';
import {auth} from './middleware/authMiddleware.js';
import cors from "cors";

const app = express(); 
const router = express.Router();
router.use(express.json());

app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: '*', // Specify allowed headers, including 'email'
}));

// display user page
router.get('/', function(req, res, 
    next) {      
    console.log("hello world!!");
    res.send("hello world!");
});

// Mount the router on the root path
app.use('/', router);
app.use('/auth', authController);
app.use('/addExpense', expenseController);

app.listen(3000, () => {
    console.log("Listening on port 3000…");
});

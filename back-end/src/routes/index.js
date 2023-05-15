const express = require('express');
const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const saleProductRouter = require('./SaleProduct.Routes');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/customer/products', saleProductRouter);

module.exports = router;

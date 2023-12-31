const express = require('express');
const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const registerRouter = require('./register.routes');
const saleProductRouter = require('./SaleProduct.Routes');
const salesRouter = require('./sales.routes');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/register', registerRouter);
router.use('/sales', salesRouter);
router.use('/customer/products', saleProductRouter);

module.exports = router;

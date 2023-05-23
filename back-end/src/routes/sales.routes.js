const express = require('express');
const { SaleService } = require('../services');
const { SalesController } = require('../controller');
const validateAuth = require('../auth/validateAuth');

const router = express.Router();

const service = new SaleService();
const controller = new SalesController(service);

router.post('/', controller.getAllSales.bind(controller));
router.post('/seller', controller.getSalesSellers.bind(controller));
router.post('/newsale', validateAuth, controller.createSale.bind(controller));

module.exports = router;

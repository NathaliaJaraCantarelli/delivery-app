const express = require('express');
const { SaleService } = require('../services');
const { SalesController } = require('../controller');

const router = express.Router();

const service = new SaleService();
const controller = new SalesController(service);

router.post('/', controller.getAllSales.bind(controller));

module.exports = router;

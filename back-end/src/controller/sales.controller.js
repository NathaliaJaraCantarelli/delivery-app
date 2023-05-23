const { SaleService } = require('../services');

class SalesController {
  constructor() {
    this.saleService = new SaleService();
  }

  async getAllSales(req, res, next) {
    try {
      const { id } = req.body;
      const sales = await this.saleService.getAllSales(id);
      return res.status(200).json(sales);
    } catch (error) {
      next(error);
    }
  }

  async getSalesSellers(req, res, next) {
    try {
      const { id } = req.body;
      const sales = await this.saleService.getSalesSellers(id);
      return res.status(200).json(sales);
    } catch (error) {
      next(error);
    }
  }

  async createSale(req, res, next) {
    try {
      // const { userId, sellerId, totalPrice, deliveryAdress, deliveryNumber, saleDate } = req.body;
      const newSale = await this.saleService.createSale(req.body);
      // const sales = await this.saleService.getAllSales(3);
      return res.status(201).json(newSale);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SalesController;
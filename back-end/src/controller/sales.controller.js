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
}

module.exports = SalesController;
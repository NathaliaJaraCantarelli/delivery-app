const Sale = require('../database/models/Sale');

class SaleService {
  constructor() {
    this.saleModel = Sale;
  }

  async getAllSales(id) {
    return this.saleModel.findAll({
      where: { userId: id },
    });
  }
}

module.exports = SaleService;

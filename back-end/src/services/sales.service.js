const NotFoundError = require('../middlewares/errors/notFound.error');
const { Sale } = require('../database/models');

class SaleService {
  constructor() {
    this.saleModel = Sale;
  }

  async getAllSales(userId) {
    const sale = await this.saleModel.findAll({ where: { userId } });
    if (!sale) throw new NotFoundError('Sales not found');
    return sale;
  }
}

module.exports = SaleService;

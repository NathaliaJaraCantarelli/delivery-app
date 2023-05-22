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

  async createSale({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate }) {
    const sale = await this.saleModel.create({ 
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status: 'Pendente',
     });
    if (!sale) throw new NotFoundError('Sales not found');
    return sale;
  }
}

module.exports = SaleService;

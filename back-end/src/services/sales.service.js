const NotFoundError = require('../middlewares/errors/notFound.error');
const { Sale, SaleProduct } = require('../database/models');

const SALENOTFOUND = 'Sales not found';

class SaleService {
  constructor() {
    this.saleModel = Sale;
    this.saleProductModel = SaleProduct;
  }

  async getAllSales(userId) {
    const sale = await this.saleModel.findAll({ where: { userId } });
    if (!sale) throw new NotFoundError(SALENOTFOUND);
    return sale;
  }

  async getSalesSellers(sellerId) {
    const sale = await this.saleModel.findAll({ where: { sellerId } });
    if (!sale) throw new NotFoundError(SALENOTFOUND);
    return sale;
  }

  async getSalesById(id) {
    const sale = await this.saleModel.findByPk(id);
    if (!sale) throw new NotFoundError(SALENOTFOUND);
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
    if (!sale) throw new NotFoundError(SALENOTFOUND);
    return sale;
  }

  async createSaleProduct(product, saleId) {
    await this.saleProductModel.create({
      productId: product.id,
      quantity: product.quantity,
      saleId,
    });
  }
}

module.exports = SaleService;

const NotFoundError = require('../middlewares/errors/notFound.error');
const { Sale, SaleProduct, Product, User } = require('../database/models');

const SALENOTFOUND = 'Sales not found';

class SaleService {
  constructor() {
    this.saleModel = Sale;
    this.saleProductModel = SaleProduct;
    this.productModel = Product;
    this.userModel = User;
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
    const sale = await this.saleModel.findAll({ where: { id } });
    if (!sale) throw new NotFoundError(SALENOTFOUND);
    return sale;
  }

  async getSalesByIdWithJoin(id) {
    const sale = await this.saleModel.findOne({
      where: { id },
      include: [
        { model: Product,
          as: 'products',
          attributes: ['name', 'price'],
          through: { attributes: ['quantity'] } },
        { model: User, as: 'seller', attributes: ['name'] },
      ],
    });
    if (!sale) throw new NotFoundError(SALENOTFOUND);
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

  async updateStatus(status, id) {
    await this.saleModel.update(
      { status },
      { where: { id } },
    );
  }
}

module.exports = SaleService;

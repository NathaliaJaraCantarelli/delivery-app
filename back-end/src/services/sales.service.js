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
      // attributes: ['name', 'price'],
      // include: [
      //   {
      //     model: 'SaleProduct',
      //     attributes: ['quantity'],
      //     where: { saleId: id },
      //   },
      // ],

      where: { id },
      include: [
        { model: this.productModel,
          as: 'products',
          attributes: ['name', 'price'],
          through: { attributes: ['quantity'] } },
        { model: this.userModel, as: 'seller', attributes: ['name'] },
      ],
    });
    if (!sale) throw new NotFoundError(SALENOTFOUND);
    return sale;
  }

  // const getOrderDetails = async (saleId) => {
  //   const order = await Sale.findOne(
  //     {
  //     where: { id: saleId },
  //     include: [
  //       { model: Product,
  //         as: 'products',
  //         attributes: ['name', 'price'],
  //         through: { attributes: ['quantity'] } },
  //       { model: User, as: 'seller', attributes: ['name'] },
  //     ],
  //     },
  //   );
  
  //   if (!order) return { type: 404, message: 'Pedido não encontrado' };
  //   return { type: null, message: orderObject(order) };
  // };

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

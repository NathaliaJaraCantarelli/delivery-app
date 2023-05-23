const { SaleService } = require('../services');
// const { createSaleProduct } = require('../services/salesProducts.service');

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

  async getSalesById(req, res, next) {
    try {
      const { id } = req.params;
      const sales = await this.saleService.getSalesById(id);
      return res.status(200).json(sales);
    } catch (error) {
      next(error);
    }
  }

  async createSale(req, res, next) {
    try {
      const { products } = req.body;
      const newSale = await this.saleService.createSale(req.body);
      const allProducts = products.map((product) => this
        .saleService.createSaleProduct(product, newSale.id));
      Promise.all(allProducts);

      // await this.saleService.createSaleProduct(products, newSale.id);
      // const sales = await this.saleService.getAllSales(3);
      return res.status(201).json(newSale);
    } catch (error) {
      next(error);
    }
  }

  // async createSaleProduct(req, res, next) {
  //   try {
  //     const { products } = req.body;
  //     // const newSale = await this.saleService.createSale(req.body);
  //     // const sales = await this.saleService.getAllSales(3);
  //     return res.status(201).json({ message: 'foi' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = SalesController;
const SaleProductService = require('../services/SaleProduct');

const getAll = async (req, res) => {
  try {
    const result = await SaleProductService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  getAll,
};

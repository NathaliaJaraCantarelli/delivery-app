const { User: UserModel } = require('../database/models');
const NotFoundError = require('../middlewares/errors/notFound.error');

class UserSequelizeRepository {
  constructor() {
    this.userModel = UserModel;
  }

  async getAll() {
    const users = await this.userModel.findAll();
    if (!users.length) throw new NotFoundError('No users found');
    return users;
  }

  async getById(id) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async getByEmail(email) {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async postLogin(email) {
    const user = await this.userModel.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'role'],
    });
    return user;
  }

  async getLogin(id, email, password, role) {
    const user = await this.userModel.findOne({
      where: { id, email, password, role },
      attributes: ['role'],
    });
    return user;
  }
}

module.exports = UserSequelizeRepository;
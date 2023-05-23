const crypto = require('crypto');
const UserRepository = require('../repositories/UserSequelize.repository');
const UserValidations = require('./validations/user.validations');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUser() {
    const users = await this.userRepository.getAll();
    return users;
  }

  async getUserByRole(role) {
    const users = await this.userRepository.getAllByRole(role);
    return users;
  }

  async getUserByEmail(email) {
    const user = await this.userRepository.getByEmail(email);
    return user;
  }

  async getUserByName(name) {
    const user = await this.userRepository.getByName(name);
    return user;
  }

  async createUser(name, email, password, role = 'customer') {
    UserValidations.validateEmail(email);
    UserValidations.validatePassword(password);
    UserValidations.validateUsername(name);

    const hasUserEmail = await this.getUserByEmail(email);
    const hasUserName = await this.getUserByName(name);

    UserValidations.validateUserExists(hasUserEmail, hasUserName);
   
    const md5Password = crypto.createHash('md5').update(password).digest('hex');
    const user = await this.userRepository.createUser(name, email, md5Password, role);
    return user;
  }
}

module.exports = UserService;
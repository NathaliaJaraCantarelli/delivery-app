const UserRepository = require('../repositories');

class UserService {
  constructor() {
    this.userRepository = UserRepository;
  }

  async getUser() {
    const users = await this.userRepository.getAll();
    return users;
  }
}

module.exports = UserService;
const { UserService } = require('../services');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUser(_req, res, next) {
    try {
      const users = await this.userService.getUser();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.userService.createUser(name, email, password);
      res.status(201).json({ newUser });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

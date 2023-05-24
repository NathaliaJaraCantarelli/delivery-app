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

  async getUserByRole(req, res, next) {
    try {
      const { role } = req.body;
      const users = await this.userService.getUserByRole(role);
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      let { role } = req.body;
      if (!role) role = 'customer';
      const newUser = await this.userService.createUser(name, email, password, role);
      res.status(201).json({ newUser });
    } catch (error) {
      next(error);
    }
  }

  async removeUser(req, res, next) {
    try {
      const { id } = req.body;
      await this.userService.removeUser(id);
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

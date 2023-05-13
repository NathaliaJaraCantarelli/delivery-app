const { UserService } = require('../services');

class UserController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.userService = UserService;
  }

  async getUser() {
    try {
      const users = await this.userService.getUser();
      this.res.status(200).json({ users });
    } catch (error) {
      this.next(error);
    }
  }
}

module.exports = UserController;

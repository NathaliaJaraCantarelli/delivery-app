const { LoginService } = require('../services');

class LoginController {
  constructor() {
    this.loginService = new LoginService();
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.loginService.postLogin(email, password);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // getRole(req, res, next) {
  //   try {
  //     const role = req.user ? req.user : { role: 'default' };
  //     res.status(200).json(role);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = LoginController;

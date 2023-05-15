const express = require('express');
const { LoginController } = require('../controller');
const { LoginService } = require('../services');
const LoginSequelizeRepository = require('../repositories/UserSequelize.repository');
const verifyRequiredFields = require('../middlewares/verifyRequiredFields');
const UserValidations = require('../services/validations/user.validations');
const LoginValidations = require('../services/validations/login.validations');
// const validateAuth = require('../auth/validateAuth');

const router = express.Router();

const loginRepository = new LoginSequelizeRepository();
const loginValidations = new LoginValidations();
const userValidations = new UserValidations();
const loginService = new LoginService(userValidations, loginValidations, loginRepository);
const loginController = new LoginController(loginService);

router
  .post('/', verifyRequiredFields('login'), loginController.login.bind(loginController));
  // .get('/login/role', validateAuth(), loginController.getRole.bind(loginController));

module.exports = router;

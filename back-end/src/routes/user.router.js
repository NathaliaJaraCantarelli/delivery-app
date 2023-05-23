const express = require('express');
const { UserController } = require('../controller');
const { UserService } = require('../services');
const { UserRepository } = require('../repositories');

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router
  .get('/', userController.getUser.bind(userController));
  
router
  .post('/role', userController.getUserByRole.bind(userController));

module.exports = router;
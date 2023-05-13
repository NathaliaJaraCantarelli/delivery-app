const jwt = require('jsonwebtoken');
const LoginService = require('../services/login.service');
const UserValidations = require('../services/validations/user.validations');
const LoginValidations = require('../services/validations/login.validations');
const UserSequelizeRepository = require('../repositories/UserSequelize.repository');

const JWT_SECRET = 'jwt_secret';

const loginService = new LoginService(
  new UserValidations(),
  new LoginValidations(),
  new UserSequelizeRepository(),
);

const validateAuth = () => async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId, userEmail, userRole, userPassword } = decoded.data;
    const user = await loginService.getLogin(userId, userEmail, userPassword, userRole);
    if (!user) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

module.exports = validateAuth;

const generateToken = require('../auth/createToken');
const UserValidations = require('./validations/user.validations');
const LoginValidations = require('./validations/login.validations');
const UserRepository = require('../repositories/UserSequelize.repository');

class LoginService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async postLogin(emailData, passwordData) {
    UserValidations.validateEmail(emailData);
    UserValidations.validatePassword(passwordData);
    const user = await this.userRepository.postLogin(emailData);
    LoginValidations.validateUser(user);
    const { password } = user;
    const verifyPassword = await LoginValidations.validatePassword(passwordData, password);
    if (verifyPassword) return generateToken(user);
  }

  async getLogin(id, email, password, role) { // usada na validação do login
    const user = await this.userRepository.getLogin(id, email, password, role);
    LoginValidations.validateId(user);
    return user;
  }
}

module.exports = LoginService;
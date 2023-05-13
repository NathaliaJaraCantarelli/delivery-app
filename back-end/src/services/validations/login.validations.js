const crypto = require('crypto');
const UnauthorizedError = require('../../middlewares/errors/unauthorized.error');
const NotFoundError = require('../../middlewares/errors/notFound.error');

const UNAUTHORIZED_MESSAGE = 'Invalid email or password';

class LoginValidations {
  static validateUser(user) {
    if (!user) {
      throw new NotFoundError(UNAUTHORIZED_MESSAGE);
    }
  }

  static async validatePassword(passwordData, password) {
    const md5Password = crypto.createHash('md5').update(passwordData).digest('hex');
      if (md5Password !== password) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }
  }

  static validateId(user) {
    if (!user) {
      throw new NotFoundError('User not found');
    }
  }
}

module.exports = LoginValidations;

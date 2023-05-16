const UnauthorizedError = require('../../middlewares/errors/unauthorized.error');
const InvalidParamsError = require('../../middlewares/errors/invalidParams.error');
const AlreadyExistsError = require('../../middlewares/errors/alreadyExists.error ');

const UNAUTHORIZED_MESSAGE = 'Invalid email or password';
const INVALID_USERNAME_MESSAGE = 'User name must be at least 3 characters long';

class UserValidations {
  static validateEmail(email) {
    const emailValidation = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailValidation.test(email)) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }
  }

  static validatePassword(password) {
    if (password.length < 6) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }
  }

  static validateUsername(username) {
    if (username.length <= 12) {
      throw new InvalidParamsError(INVALID_USERNAME_MESSAGE);
    }
  }

  static validateUserExists(userEmail, userName) {
    if (userEmail || userName) {
      throw new AlreadyExistsError('User already exists');
    }
  }
}

module.exports = UserValidations;
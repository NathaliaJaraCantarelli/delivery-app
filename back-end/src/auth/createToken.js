const jwt = require('jsonwebtoken');

const JWT_SECRET = 'jwt_secret';

function generateToken(user) {
  const { id, email, role, password } = user;
  console.log(user);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: {
    userId: id,
    userEmail: email,
    userRole: role,
    userPassword: password,
  } }, JWT_SECRET, jwtConfig);
  return token;
}

module.exports = generateToken;
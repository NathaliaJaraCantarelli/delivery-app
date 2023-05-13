const requiredFields = {
  login: ['email', 'password'],
  username: ['username', 'role', 'email', 'password'],
};

const verifyRequiredFields = (key) => (req, res, next) => {
    for (let i = 0; i < requiredFields[key].length; i += 1) {
      if (!req.body[requiredFields[key][i]]) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
    next();
  };

module.exports = verifyRequiredFields;

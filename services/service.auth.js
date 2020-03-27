const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const getAuthenticatedUser = async (userId) => {
  const user = await User.findById(userId).select('-password -_id -__v');
  if (!user) throw new Error('User does not exist');

  return user;
};

const authenticate = async (body) => {
  const { username, password } = body;

  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid credentials');

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    {
      user: {
        id: user.id
      }
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.NODE_ENV === 'production' ? 3600 : 36000
    }
  );

  return { token };
};

module.exports = {
  authenticate,
  getAuthenticatedUser
};

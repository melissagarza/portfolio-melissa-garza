const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
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
  authenticate
};

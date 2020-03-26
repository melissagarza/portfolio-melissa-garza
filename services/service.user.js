const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chance = require('chance').Chance();
const { User } = require('../models');

const registerUser = async (userInfo) => {
  const { name, email, password } = userInfo;
  try {
    let user = await User.findOne({ email });
    if (user) throw new Error('User already exists');

    let alias = chance.animal();
    let userWithSameAlias = await User.find({ alias });
    while (userWithSameAlias.length > 0) {
      alias += ` ${chance.animal()}`;
      userWithSameAlias = await User.find({ alias });
    }

    user = new User({ name, email, password, alias });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

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

    await user.save();
    return { token };

  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  registerUser
}

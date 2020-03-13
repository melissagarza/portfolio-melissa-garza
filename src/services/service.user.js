const { User } = require('../models');

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

const createUser = async (userInfo) => {
  const user = new User(userInfo);

  try {
    return await user.save();
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser
}

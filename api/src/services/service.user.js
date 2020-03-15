const { User } = require('../models');

const getUsers = async () => {
  return await User.find();
}

const getUser = async (userId) => {
  return await User.findById(userId);
}

const createUser = async (userInfo) => {
  const user = new User(userInfo);
  return await user.save();
}

module.exports = {
  getUsers,
  getUser,
  createUser
}

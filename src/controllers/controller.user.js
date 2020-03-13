const { serviceUser } = require('../services');

const getUsers = async (req, res) => {
  try {
    const users = await serviceUser.getUsers();
    res.send(users);
  } catch (err) {
    res.send(`Error: ${err.message}`);
  }
}

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await serviceUser.getUser(userId);
    res.send(user);
  } catch (err) {
    res.send(`Error: ${err.message}`);
  }
}

const createUser = async (req, res) => {
  try {
    const user = await serviceUser.createUser(req.body);
    res.send(user);
  } catch (err) {
    res.send(`Error: ${err.message}`);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser
};

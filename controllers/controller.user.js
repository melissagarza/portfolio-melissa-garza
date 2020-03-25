const { validationResult } = require('express-validator');
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

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const token = await serviceUser.registerUser(req.body);
    res.send(token);
  } catch (err) {
    res.send(`Error: ${err.message}`);
  }
}

module.exports = {
  getUsers,
  getUser,
  registerUser
};

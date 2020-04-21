const { validationResult } = require('express-validator');
const { serviceAuth } = require('../services');

const getAuthenticatedUser = async (req, res) => {
  try {
    const user = await serviceAuth.getAuthenticatedUser(req.user.id);
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        { msg: err.message }
      ]
    });
  }
};

const authenticate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const token = await serviceAuth.authenticate(req.body);
    res.send(token);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        { msg: err.message }
      ]
    });
  }
};

module.exports = {
  getAuthenticatedUser,
  authenticate
};

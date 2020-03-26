const { validationResult } = require('express-validator');
const { serviceUser } = require('../services');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const token = await serviceUser.registerUser(req.body);
    res.send(token);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  registerUser
};

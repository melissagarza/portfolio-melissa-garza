const { validationResult } = require('express-validator');
const { serviceAuth } = require('../services');

const authenticate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const token = await serviceAuth.authenticate(req.body);
    res.send(token);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  authenticate
};

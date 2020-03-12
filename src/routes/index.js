const express = require('express');
const routerApi = express.Router();

routerApi.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = routerApi;

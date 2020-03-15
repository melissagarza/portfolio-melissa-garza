const express = require('express');
const routerUser = require('./router.user');

const routerApi = express.Router();

routerApi.use('/users', routerUser);

module.exports = routerApi;

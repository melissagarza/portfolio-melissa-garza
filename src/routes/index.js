const express = require('express');
const { controllerUser } = require('../controllers');

const routerApi = express.Router();

routerApi.get('/users', controllerUser.getUsers);
routerApi.get('/users/:id', controllerUser.getUser);
routerApi.post('/users', controllerUser.createUser);

module.exports = routerApi;

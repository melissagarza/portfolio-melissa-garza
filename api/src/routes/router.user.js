const express = require('express');
const { controllerUser } = require('../controllers');

const routerUser = express.Router();

routerUser.get('/', controllerUser.getUsers);
routerUser.get('/:id', controllerUser.getUser);
routerUser.post('/', controllerUser.createUser);

module.exports = routerUser;

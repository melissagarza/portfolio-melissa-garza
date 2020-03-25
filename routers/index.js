const express = require('express');
const routerAuth = require('./router.auth');
const routerUser = require('./router.user');
const routerExercise = require('./router.exercise');

const routerApi = express.Router();

routerApi.use('/auth', routerAuth);
routerApi.use('/users', routerUser);
routerApi.use('/exercises', routerExercise);

module.exports = routerApi;

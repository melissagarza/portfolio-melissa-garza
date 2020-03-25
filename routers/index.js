const express = require('express');
const routerUser = require('./router.user');
const routerExercise = require('./router.exercise');

const routerApi = express.Router();

routerApi.use('/users', routerUser);
routerApi.use('/exercises', routerExercise);

module.exports = routerApi;

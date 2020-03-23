const express = require('express');
const { controllerExercise } = require('../controllers');

const routerExercise = express.Router();

routerExercise.get('/', controllerExercise.getExercises);

module.exports = routerExercise;

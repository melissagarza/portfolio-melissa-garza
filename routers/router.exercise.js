const express = require('express');
const fileUpload = require('express-fileupload');
const { controllerExercise } = require('../controllers');

const routerExercise = express.Router();

routerExercise.use(fileUpload());

routerExercise.get('/', controllerExercise.getExercises);
routerExercise.get('/:exercise_id', controllerExercise.getExercise);
routerExercise.post('/upload', controllerExercise.upload);

module.exports = routerExercise;

const express = require('express');
const fileUpload = require('express-fileupload');
const auth = require('../middleware/auth');
const { controllerExercise } = require('../controllers');

const routerExercise = express.Router();

routerExercise.use(fileUpload());

routerExercise.get('/', controllerExercise.getExercises);
routerExercise.get('/:exercise_id', controllerExercise.getExercise);
routerExercise.post('/upload', auth, controllerExercise.upload);

module.exports = routerExercise;

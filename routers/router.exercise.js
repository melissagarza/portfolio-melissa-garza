const express = require('express');
const fileUpload = require('express-fileupload');
const auth = require('../middleware/auth');
const { controllerExercise } = require('../controllers');

const routerExercise = express.Router();

routerExercise.use(fileUpload());

routerExercise.get('/', controllerExercise.getExercises);
routerExercise.get('/names', controllerExercise.getExerciseNames);
routerExercise.get('/me', auth, controllerExercise.getExercisesByUser);
routerExercise.get('/names/me', auth, controllerExercise.getExerciseNamesByUser);
routerExercise.post('/upload', auth, controllerExercise.upload);

module.exports = routerExercise;

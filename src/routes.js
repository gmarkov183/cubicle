
const express = require('express');

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeContoller');
const accessoryController = require('./controllers/accessoryController')

const router = express.Router();

router.use('/', homeController);

router.use('/cube', cubeController);

router.use('/accessory', accessoryController);

module.exports = router;







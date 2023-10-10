const path = require('path');

const express = require("express");

const user = express.Router();


const controller = require('../controllers/userController');

router.get('/login', controller.login);

module.exports = user
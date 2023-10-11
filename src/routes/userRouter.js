const path = require('path');

const express = require("express");

const router = express.Router();

const controller = require('../controllers/userController');

router.get('/login', controller.login);
router.post('/login', controller.login);

router.get('/register', controller.register);
router.post('/register', controller.register);

module.exports = router
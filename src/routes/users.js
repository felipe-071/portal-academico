const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UserController');

router.get('/', UsersController.readAll);

module.exports = router;

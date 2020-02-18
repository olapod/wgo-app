const express = require('express');
const router = express.Router();
const withAuth = require('../middleware');

const UserController = require('../controllers/User.controller');

router.route('/api/admin').get(withAuth, UserController.getAdmin);

router.route('/api/register').post(UserController.register);

router.route('/api/authenticate').post(UserController.authenticate);

router.route('/checkToken').get(withAuth, UserController.checkToken);

module.exports = router;
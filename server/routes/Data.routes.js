const express = require('express');
const router = express.Router();

const DataController = require('../controllers/Data.controller');

// get all posts
router.route('/api/getSummary').get(DataController.getSummary);

// get single post
router.route('/api/getStreets').get(DataController.getStreets);

// get posts by range
router.route('/api/updateData').post(DataController.updateData);

module.exports = router;
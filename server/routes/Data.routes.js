const express = require('express');
const router = express.Router();

const DataController = require('../controllers/Data.controller');

// get summary
router.route('/api/getSummary').get(DataController.getSummary);

// get streets
router.route('/api/getStreets').get(DataController.getStreets);

// update database
router.route('/api/updateData').post(DataController.updateData);

router.route('/api/streets/:street').get(DataController.filterByStreet);

router.route('/api/streets/:street/:number').get(DataController.filterByStreetAndNumber);

module.exports = router;
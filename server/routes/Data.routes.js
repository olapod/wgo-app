const express = require('express');
const router = express.Router();

const DataController = require('../controllers/Data.controller');

// get summary
router.route('/api/getSummary/range/:startAt/:limit').get(DataController.getSummary);

// get streets
router.route('/api/getStreets').get(DataController.getStreets);

// update database
router.route('/api/updateData').post(DataController.updateData);

//filter by street
router.route('/api/streets/:street').get(DataController.filterByStreet);

//filter by street and number
router.route('/api/streets/:street/:number').get(DataController.filterByStreetAndNumber);

//get differences in DGO and ELUD registration
router.route('/api/getDiff').get(DataController.getDiff);

//filter by differeneces
router.route('/api/differences/:diff/range/:startAt/:limit').get(DataController.filterByDiff);

//filter by DGO status
// router.route('/api/DGOstatus/:status').get(DataController.filterByDGOstatus);
router.route('/api/DGOstatus/:status/range/:startAt/:limit').get(DataController.filterByDGOstatus);

module.exports = router;
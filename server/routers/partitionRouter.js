const express = require('express');
const router = express.Router();
const partitionController = require('../controllers/partitionController.js');
const { getSavedPortFromElectronStore } = require('../controllers/promPortController');


router.get('/partition', getSavedPortFromElectronStore, partitionController.totalPartitionCount, (req, res) => {
  return res.status(200).json(res.locals /*.whatever*/);
});

router.get('/partition', getSavedPortFromElectronStore, partitionController.offlinePartitionCount, (req, res) => {
  return res.status(200).json(res.locals /*.whatever*/);
});

module.exports = router;

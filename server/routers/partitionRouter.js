const express = require('express');
const router = express.Router();
const partitionController = require('../controllers/partitionController.js');
const { getSavedPortFromElectronStore } = require('../controllers/promPortController');

router.get('/total-count', getSavedPortFromElectronStore, partitionController.totalPartitionCount, (req, res) => {
  return res.status(200).json(res.locals.totalPartitionCount);
});

router.get('/offline-count', getSavedPortFromElectronStore, partitionController.offlinePartitionCount, (req, res) => {
  return res.status(200).json(res.locals.offlinePartitionCount);
});

router.get('/under-replicated', getSavedPortFromElectronStore, partitionController.underReplicated, (req, res) => {
  return res.status(200).json(res.locals.underReplicated);
});

module.exports = router;

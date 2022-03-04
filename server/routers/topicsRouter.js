const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController.js');
const { getSavedPortFromElectronStore } = require('../controllers/promPortController');

router.get('/total-count', getSavedPortFromElectronStore, topicsController.totalTopicCount, (req, res) => {
  return res.status(200).json(res.locals.totalTopicCount);
});

router.get('/metrics', getSavedPortFromElectronStore, topicsController.totalTopicMetrics, (req, res) => {
  return res.status(200).json(res.locals.totalTopicMetrics);
});

module.exports = router;
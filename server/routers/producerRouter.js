const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController.js');
const { getSavedPortFromElectronStore } = require('../controllers/promPortController');


router.get('/total-request-count', getSavedPortFromElectronStore, producerController.totalProducerRequests, (req, res) => {
  return res.status(200).json(res.locals.totalProducerRequests);//also contains producer requests for EACH topic
});

router.get('/total-failed-count', getSavedPortFromElectronStore, producerController.totalFailedProducerRequests, (req, res) => {
  return res.status(200).json(res.locals.totalFailedProducerRequests);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController.js');

router.get('/total-request-count', producerController.totalProducerRequests, (req, res) => {
    return res.status(200).json(res.locals.totalProducerRequests);//also contains producer requests for EACH topic
  }
);

router.get('/producer', producerController.totalFailedProducerRequests, (req, res) => {
    return res.status(200).json(res.locals /*.whatever*/);
  }
);

module.exports = router;

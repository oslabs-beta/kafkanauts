const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController.js');

router.get('/producer', producerController.totalProducerRequests, (req, res) => {
    return res.status(200).json(res.locals /*.whatever*/);
  }
);

router.get('/producer', producerController.totalFailedProducerRequests, (req, res) => {
    return res.status(200).json(res.locals /*.whatever*/);
  }
);

module.exports = router;

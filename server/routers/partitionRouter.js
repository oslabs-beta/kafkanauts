const express = require('express');
const router = express.Router();
const partitionController = require('../controllers/partitionController.js');

router.get('/partition', partitionController.totalPartitionCount, (req, res) => {
    return res.status(200).json(res.locals /*.whatever*/);
  }
);

router.get('/partition', partitionController.offlinePartitionCount, (req, res) => {
    return res.status(200).json(res.locals /*.whatever*/);
  }
);

module.exports = router;

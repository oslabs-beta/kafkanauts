const express = require("express");
const router = express.Router();
const consumerController = require('../controllers/consumerController');
const partitionController = require('../controllers/partitionController');


router.get('/consumer', (req, res) => {
  return res.status(200).json(res.locals/*.whatever*/);
});

router.get('/partition', (req, res) => {
  return res.status(200).json(res.locals/*.whatever*/);
});

module.exports = router;
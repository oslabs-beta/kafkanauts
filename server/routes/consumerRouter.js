const express = require("express");
const router = express.Router();
const consumerController = require('../controllers/consumerController');


router.get('/consumer', (req, res) => {
  return res.status(200).json(res.locals/*.whatever*/);
});

module.exports = router;
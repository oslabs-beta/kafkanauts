const express = require('express');
const router = express.Router();
const { validate } = require('../controllers/promPortController.js')

router.post('/', validate, (req, res) => {
  return res.status(200).json('okay');
});

module.exports = router;

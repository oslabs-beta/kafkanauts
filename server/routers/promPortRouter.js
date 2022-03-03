const express = require('express');
const router = express.Router();
const { savePortToElectronStore } = require('../controllers/promPortController.js')

router.post('/', savePortToElectronStore, (req, res) => {
  return res.status(200).json('okay');
});

module.exports = router;

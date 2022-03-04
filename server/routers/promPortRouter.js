const express = require('express');
const router = express.Router();
const { isPromPortUp, savePortToElectronStore } = require('../controllers/promPortController.js')

router.post('/', isPromPortUp, savePortToElectronStore, (req, res) => {
  return res.status(200).json({status: 'success'});
});

module.exports = router;

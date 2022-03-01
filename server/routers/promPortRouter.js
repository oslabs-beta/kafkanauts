const express = require('express');
const router = express.Router();
const ElectronStore = require('electron-store');
const db = new ElectronStore();

router.post('/', (req, res) => {
  const { port } = res.locals;
  if (port.match(/^[0-9]{4,5}$/)) {
    db.set('port', port);
    return res.status(200);
  }
  return res.status(400).json('Expected a number for port');
});


module.exports = router;

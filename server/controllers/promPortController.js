const ElectronStore = require('electron-store');
const schema = {
  port: {
    type: 'string',
  },
  shellName: {
    type: 'string',
  }
}
const db = new ElectronStore({schema});

module.exports = {
  savePortToElectronStore(req, res, next) {
    const { port, shellName } = req.body;
    // https://stackoverflow.com/questions/12968093/regex-to-validate-port-number#comment89586361_12968117
    const convertStringToNum = Number(port);
    if (!Number.isInteger(convertStringToNum) || convertStringToNum < 0 || convertStringToNum > 65535) {
      return res.status(400).json('Expected an integer from 0 to 65535.');
    }
    db.set('port', port);
    db.set('shellName', shellName);
    return next();
  },
  
  getSavedPortFromElectronStore(req, res, next) {
    const port = db.get('port');
    res.locals.port = port;
    return next();
  }
}
const axios = require('axios');
const producerController = {};
const ElectronStore = require('electron-store');
const db = new ElectronStore();
const port = db.get('port')

producerController.totalProducerRequests = async (req, res, next) => {
  try {
    const { data } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`);
    res.locals.totalProducerRequests = data.data.result; //also contains producer requests for EACH topic
    return next();
  } catch (e) {
    return next(e);
  }
}

producerController.totalFailedProducerRequests = async (req, res, next) => {
    
}

module.exports = producerController;
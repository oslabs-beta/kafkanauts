const axios = require('axios');
const producerController = {};
const ElectronStore = require('electron-store');
const db = new ElectronStore();
const port = db.get('port')

producerController.totalProducerRequests = async (req, res, next) => {
  try {
    const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`);
    res.locals.totalProducerRequests = result; //also contains producer requests for EACH topic
    return next();
  } catch (e) {
    return next(e);
  }
  /**example of api call data
   *  res.locals.totalProducerRequests = [
         {
            "metric":{
               "__name__":"kafka_server_brokertopicmetrics_totalproducerequests_total",
               "instance":"kafka:7071",
               "job":"kafka"
            },
            "value":[
               1646192303.008,
               "320"
            ]
         },
         {
            "metric":{
               "__name__":"kafka_server_brokertopicmetrics_totalproducerequests_total",
               "instance":"kafka:7071",
               "job":"kafka",
               "topic":"topic1"
            },
            "value":[
               1646192303.008,
               "80"
            ]
         },
         {
            "metric":{
               "__name__":"kafka_server_brokertopicmetrics_totalproducerequests_total",
               "instance":"kafka:7071",
               "job":"kafka",
               "topic":"topic2"
            },
            "value":[
               1646192303.008,
               "80"
            ]
         },
         {
            "metric":{
               "__name__":"kafka_server_brokertopicmetrics_totalproducerequests_total",
               "instance":"kafka:7071",
               "job":"kafka",
               "topic":"topic3"
            },
            "value":[
               1646192303.008,
               "80"
            ]
         },
         {
            "metric":{
               "__name__":"kafka_server_brokertopicmetrics_totalproducerequests_total",
               "instance":"kafka:7071",
               "job":"kafka",
               "topic":"topic4"
            },
            "value":[
               1646192303.008,
               "80"
            ]
         }
      ]
   
   */
}

producerController.totalFailedProducerRequests = async (req, res, next) => {
    
}

module.exports = producerController;
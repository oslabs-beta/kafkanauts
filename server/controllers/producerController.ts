const axios = require('axios');
const producerController = {
  async totalProducerRequests(req, res, next){
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`);
      res.locals.totalProducerRequests = result; //also contains producer requests for EACH topic
      return next();
    } catch (e) {
      return next(e);
    }
  },

  async totalFailedProducerRequests(req, res, next) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_failedproducerequests_total`);
      res.locals.totalFailedProducerRequests = result;
      return next();
    } catch (e) {
      return next(e);
    }
  
    
  }
};

// producerController.totalProducerRequests = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`);
//     res.locals.totalProducerRequests = result; //also contains producer requests for EACH topic
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// }

// producerController.totalFailedProducerRequests = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_failedproducerequests_total`);
//     res.locals.totalFailedProducerRequests = result;
//     return next();
//   } catch (e) {
//     return next(e);
//   }

  
// }

export default producerController;
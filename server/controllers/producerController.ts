import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const producerController = {
  //Metrics to show total producer requests
  async totalProducerRequests(req: Request, res: Response, next: NextFunction)  {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`);
      res.locals.totalProducerRequests = result; //also contains producer requests for EACH topic
      return next();
    } catch (e) {
      return next(e);
    }
  },
  //Metrics to show total failed producer requests
  async totalFailedProducerRequests(req: Request, res: Response, next: NextFunction) {
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
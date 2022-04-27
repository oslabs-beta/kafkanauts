import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const topicsController = {
  async totalTopicCount (req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globaltopiccount`);
      res.locals.totalTopicCount = result; //also contains producer requests for EACH topic
      return next();
    } catch (e) {
      return next(e);
    }
  },

  async totalTopicMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const topicMetrics = [
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesin_total`), //total bytes in for cluster AND each topic //example: https://i.imgur.com/mHTXzoP.png
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesout_total`), //total bytes out for cluster AND each topix //example: https://i.imgur.com/zIuiXU2.png
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesrejected_total`), //example: https://i.imgur.com/RH40ocK.png
        // axios.get(`http://localhost:${port}/api/v1/query?query=`), // put another relevant query here
      ];
      const axiosGetAll = await Promise.all(topicMetrics);
      const destructureResults = axiosGetAll.map(promResult => promResult.data.data.result);
      res.locals.totalTopicMetrics = destructureResults; // this should be an array of arrays
      return next();
    } catch (e) {
      return next(e);
    }
  }

};

// topicsController.totalTopicCount = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globaltopiccount`);
//     res.locals.totalTopicCount = result; //also contains producer requests for EACH topic
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// }

// topicsController.totalTopicMetrics = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const topicMetrics = [
//       axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesin_total`), //total bytes in for cluster AND each topic //example: https://i.imgur.com/mHTXzoP.png
//       axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesout_total`), //total bytes out for cluster AND each topix //example: https://i.imgur.com/zIuiXU2.png
//       axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesrejected_total`), //example: https://i.imgur.com/RH40ocK.png
//       // axios.get(`http://localhost:${port}/api/v1/query?query=`), // put another relevant query here
//     ];
//     const axiosGetAll = await Promise.all(topicMetrics);
//     const destructureResults = axiosGetAll.map(promResult => promResult.data.data.result);
//     res.locals.totalTopicMetrics = destructureResults; // this should be an array of arrays
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// }

export default  topicsController;
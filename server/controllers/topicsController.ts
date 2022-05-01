import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const topicsController = {
  async totalTopicCount (req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globaltopiccount`);
      const [ { metric: { instance, job }, value: [ unixTime, numOfTopics ] } ] = result
      const topicCountFormatted = {
        instance,
        job,
        time: unixTime * 1000,
        data: {
          numOfTopics// this is still a string, but there's no need to change it into a number
        }
      }
      res.locals.totalTopicCount = topicCountFormatted;
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
      const [[{ metric: { instance, job }, value: [ unixTime ] }],,[{ value: [, bytesRejected ] }]] = destructureResults;
      const bytesMetricsFormatted = {
        instance,
        job,
        time: unixTime * 1000,
        data: {
          totalBytesIn: 0,
          totalBytesOut: 0,
          bytesIn: [],
          bytesOut: [],
          bytesRejected: Number(bytesRejected),
        }
      }
      destructureResults[0].forEach(el => {
        if ('topic' in el.metric) {
          bytesMetricsFormatted.data.bytesIn.push([el.metric.topic, Number(el.value[1])])
        } else {
          bytesMetricsFormatted.data.totalBytesIn = Number(el.value[1])
        }
      })
      destructureResults[1].forEach(el => {
        if ('topic' in el.metric) {
          bytesMetricsFormatted.data.bytesOut.push([el.metric.topic, Number(el.value[1])])
        } else {
          bytesMetricsFormatted.data.totalBytesOut = Number(el.value[1])
        }
      })
      res.locals.totalTopicMetrics = bytesMetricsFormatted;
      return next();
    } catch (e) {
      return next(e);
    }
  }

};
export default topicsController;

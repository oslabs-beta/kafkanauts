import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const consumerController = {

  async consumerTotalTime (req: Request, res: Response, next: NextFunction) {
    try {
      const { port, interval } = res.locals;
      const url = `http://localhost:${port}/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=${new Date().toISOString()}&end=${new Date().toISOString()}&step=${interval}s`;
      console.log('url: ', url);
      const { data: { data: { result } } } = await axios.get(url);
      //kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=${new Date().setDate(date.getDate() - 1).toISOString()}&end=${new Date().toISOString()}&step=${interval.toString()}s
      res.locals.consumerTotalTime = result;
      //console.log(`res.locals.consumerTotalTime: `, res.locals.consumerTotalTime);
      return next();
    } catch(e) {
      return next(e);
    }
  
  },

  async consumerLag (req: Request, res: Response, next: NextFunction) {
    try {
      const { port, interval } = res.locals;
      const url = `http://localhost:${port}/api/v1/query_range?query=kafka_server_delayedfetchmetrics_expirespersec_fetchertype_consumer&start=${new Date().toISOString()}&end=${new Date().toISOString()}&step=${interval}s`;
      //console.log('url: ', url)
      const { data: { data: { result } } } = await axios.get(url)
      res.locals.consumerLag = result;
      return next();
    } catch(e) {
      return next(e)
    }

  
  }
};


export default consumerController;
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const consumerController = {

  async getConsumerTotalTime (req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}`);
      //kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=${new Date().setDate(date.getDate() - 1).toISOString()}&end=${new Date().toISOString()}&step=${interval.toString()}s
      res.locals.consumerTotalTime = result;
      return next();
    } catch(e) {
      return next(e);
    }

  
  }
};


export default consumerController;
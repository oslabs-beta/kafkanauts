import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const zookeeperController = {
  //this data does not change so it's not best for graphs
  async avg_latency (req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_zookeeperclientmetrics_zookeeperrequestlatencyms`);
      res.locals.avg_latency = result; //also contains producer requests for EACH topic
      //console.log(`AVG_LATENCY ${res.locals.avg_latency}`)
      return next();
    } catch (e) {
      return next(e);
    }
  },
  async restOfZookeeperMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const zooMetrics = [
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeeperauthfailures_total`), 
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeeperdisconnects_total`),
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeeperexpires_total`), 
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeeperreadonlyconnects_total`),
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeepersaslauthentications_total`), 
      ];
      const axiosGetAll = await Promise.all(zooMetrics);
      const destructureResults = axiosGetAll.map(promResult => promResult.data.data.result);
      res.locals.zooMetrics = destructureResults;
      return next();
    } catch(e) {
      return next(e)
    }

  }
};

export default  zookeeperController;
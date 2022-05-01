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
  }
};

export default  zookeeperController;
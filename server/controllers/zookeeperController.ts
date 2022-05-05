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
      const [[{ metric: { instance, job }, value: [ unixTime ] }]] = destructureResults;
      const zkFormatted = {
        instance,
        job,
        time: unixTime * 1000,
        data: {
          authFailures: 0,
          disconnects: 0,
          expires: 0,
          readOnlyConnects: 0,
          saslAuths: 0,
        }
      }
      destructureResults.forEach(([el]) => {
        switch (el.metric.__name__) {
          case 'kafka_server_sessionexpirelistener_zookeeperauthfailures_total':
            zkFormatted.data.authFailures = Number(el.value[1])
            break
          case 'kafka_server_sessionexpirelistener_zookeeperdisconnects_total':
            zkFormatted.data.disconnects = Number(el.value[1])
            break
          case 'kafka_server_sessionexpirelistener_zookeeperexpires_total':
            zkFormatted.data.expires = Number(el.value[1])
            break
          case 'kafka_server_sessionexpirelistener_zookeeperreadonlyconnects_total':
            zkFormatted.data.readOnlyConnects = Number(el.value[1])
            break
          case 'kafka_server_sessionexpirelistener_zookeepersaslauthentications_total':
            zkFormatted.data.saslAuths = Number(el.value[1])
            break
          default:
            break
        }
      })
      res.locals.zooMetrics = zkFormatted;
      return next();
    } catch(e) {
      return next(e)
    }

  }
};

export default  zookeeperController;
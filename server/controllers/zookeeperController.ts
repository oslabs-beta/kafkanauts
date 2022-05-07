import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

//zookeeper stores info about brokers and Kakfa themes, applies quotas to control the speed of traffic passing through the cluster, and stores info about replicas.

const zookeeperController = {
  //calculates the response time to a client request in milliseconds 
  async avg_latency (req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_zookeeperclientmetrics_zookeeperrequestlatencyms`);
      res.locals.avg_latency = result; //also contains producer requests for EACH topic
      return next();
    } catch (e) {
      return next(e);
    }
  },
  async restOfZookeeperMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;

      //the responses from following get request are stored in an array
      const zooMetrics = [
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeeperauthfailures_total`), 
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeeperdisconnects_total`),
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeeperexpires_total`), 
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeeperreadonlyconnects_total`),
        axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_sessionexpirelistener_zookeepersaslauthentications_total`), 
      ];

      //returns a Promise after completing all those get requests 
      const axiosGetAll = await Promise.all(zooMetrics);

      //stores the result of mapping each response with the data that you want to use 
      const destructureResults = axiosGetAll.map(promResult => promResult.data.data.result);
      //setts the array of with the following object as the key that stores the mapped result
      const [[{ metric: { instance, job }, value: [ unixTime ] }]] = destructureResults;

      //defines the format for the graph
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
      
      //for each of the nested array of mapped results, 
      destructureResults.forEach(([el]) => {
        //check if metric.__name__ is one of the strings in case 
        //if it is, set the authFailtures value of graph object accordingly  
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
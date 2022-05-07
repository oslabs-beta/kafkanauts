import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { PartitionController } from '../../types';

const partitionController = {
  //Metrics for total partitions
  async totalPartitionCount(req: Request, res: Response, next: NextFunction) {
  try {
    const { port } = res.locals;
    const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globalpartitioncount`);
    const [ { metric: { instance, job }, value: [ unixTime, count ] } ] = result
    const globalPartitionCountFormatted = {
      instance,
      job,
      time: unixTime * 1000,
      data: {
        count// this is still a string, but there's no need to change it into a number
      }
    }
    res.locals.totalPartitionCount = globalPartitionCountFormatted;
    return next();
  } catch(e) {
    return next(e);
  }
},
  //Metrics for total offline partitions
  async offlinePartitionCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount`);
      const [ { metric: { instance, job }, value: [ unixTime, count ] } ] = result
      const offlinePartitionCountFormatted = {
        instance,
        job,
        time: unixTime * 1000,
        data: {
          count// this is still a string, but there's no need to change it into a number
        }
      }
      res.locals.offlinePartitionCount = offlinePartitionCountFormatted;
      return next();
    } catch(e) {
      return next(e);
    }
  },
  //Metrics for under replicated partitions
  async underreplicated(req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_cluster_partition_underreplicated`);
      const [ { metric: { instance, job }, value: [ unixTime ] } ] = result
      const underreplicatedFormatted = {
        instance,
        job,
        time: unixTime * 1000,
        data: {
          underreplicated: []
        }
      }
      result.forEach(el => {
        const underreplicatedCount = el.value[1]
        if (underreplicatedCount > 0) {
          const { topic, partition } = el.metric
          underreplicatedFormatted.data.underreplicated.push({
            topic,
            partition,
            count: underreplicatedCount
          })
        }
      })
      res.locals.underreplicated = underreplicatedFormatted;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  async activeControllerCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount`);
      const [ { metric: { instance, job }, value: [ unixTime, count ] } ] = result
      const activeControllerCountFormatted = {
        instance,
        job,
        time: unixTime * 1000,
        data: {
          count// this is still a string, but there's no need to change it into a number
        }
      }
      res.locals.activeControllerCount = activeControllerCountFormatted;
      return next();
    } catch(e) {
      return next(e);
    }
  },
  async requestLatency(req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_totaltimems`);
      const [ { metric: { instance, job }, value: [ unixTime ] } ] = result
      const activeControllerCountFormatted = {
        instance,
        job,
        time: unixTime * 1000,
        data: {
          requestLatency: []
        }
      }
      result.forEach(el => {
        const latency = el.value[1]// this is a string, but it should be coerced into a Number when used against the ">" operator
        if (latency !== '0') {
          activeControllerCountFormatted.data.requestLatency.push({
            nameOfRequest: el.metric.request,
            latency: Number(latency)
          })
        }
        // activeControllerCountFormatted.data[el.metric.request] = el.value[1]
      })
      res.locals.requestLatency = activeControllerCountFormatted;
      return next();
    } catch(e) {
      return next(e);
    }
  },
};


export default partitionController;
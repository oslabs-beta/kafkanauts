// import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { PartitionController } from '../../types';
// const axios = require('axios');



const partitionController = {
  //Metrics for total partitions
  async totalPartitionCount(req: Request, res: Response, next: NextFunction) {
  try {
    const { port } = res.locals;
    const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globalpartitioncount`);
    res.locals.totalPartitionCount = result;
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
      res.locals.offlinePartitionCount = result;
      return next();
    } catch(e) {
      return next(e);
    }
  },
  //Metrics for under replicated partitions
  async underReplicated(req: Request, res: Response, next: NextFunction) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_cluster_partition_underreplicated`);
      res.locals.underReplicated = result;
      return next();
    } catch (err) {
      return next(err);
    }
  }
};

// partitionController.totalPartitionCount = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globalpartitioncount`);
//     res.locals.totalPartitionCount = result;
//     return next();
//   } catch(e) {
//     return next(e);
//   }
// }

// partitionController.offlinePartitionCount = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount`);
//     res.locals.offlinePartitionCount = result;
//     return next();
//   } catch(e) {
//     return next(e);
//   }
// }

// partitionController.underReplicated = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_cluster_partition_underreplicated`);
//     res.locals.underReplicated = result;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// }

export default partitionController;
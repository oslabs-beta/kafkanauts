import { Request, Response, NextFunction } from 'express';
const axios = require('axios');
const partitionController = {
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

  async offlinePartitionCount(req, res, next) {
    try {
      const { port } = res.locals;
      const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount`);
      res.locals.offlinePartitionCount = result;
      return next();
    } catch(e) {
      return next(e);
    }
  },

  async underReplicated(req, res, next) {
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
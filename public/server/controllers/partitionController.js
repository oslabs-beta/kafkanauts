"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const partitionController = {
    totalPartitionCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { port } = res.locals;
                const { data: { data: { result } } } = yield axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globalpartitioncount`);
                res.locals.totalPartitionCount = result;
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    },
    offlinePartitionCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { port } = res.locals;
                const { data: { data: { result } } } = yield axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount`);
                res.locals.offlinePartitionCount = result;
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    },
    underReplicated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { port } = res.locals;
                const { data: { data: { result } } } = yield axios.get(`http://localhost:${port}/api/v1/query?query=kafka_cluster_partition_underreplicated`);
                res.locals.underReplicated = result;
                return next();
            }
            catch (err) {
                return next(err);
            }
        });
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
exports.default = partitionController;
//# sourceMappingURL=partitionController.js.map
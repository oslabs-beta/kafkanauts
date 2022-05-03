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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const producerController = {
    //Metrics to show total failed producer requests
    totalFailedProducerRequests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { port } = res.locals;
                const { data: { data: { result } } } = yield axios_1.default.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_failedproducerequests_total`);
                res.locals.totalFailedProducerRequests = result;
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    },
    //Metrics to show total producer requests and total producer time for real time chart
    totalProducerMetrics(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { port } = res.locals;
                const producerMetrics = [
                    axios_1.default.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`),
                    axios_1.default.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_totaltimems{request='Produce'}`),
                ];
                const axiosGetAll = yield Promise.all(producerMetrics);
                const destructureResults = axiosGetAll.map(promResult => promResult.data.data.result);
                res.locals.totalProducerMetrics = destructureResults;
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    }
};
// producerController.totalProducerRequests = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`);
//     res.locals.totalProducerRequests = result; //also contains producer requests for EACH topic
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// }
// producerController.totalFailedProducerRequests = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_failedproducerequests_total`);
//     res.locals.totalFailedProducerRequests = result;
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// }
exports.default = producerController;

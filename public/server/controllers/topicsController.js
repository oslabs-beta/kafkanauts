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
const topicsController = {
    totalTopicCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { port } = res.locals;
                const { data: { data: { result } } } = yield axios_1.default.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globaltopiccount`);
<<<<<<< HEAD
                // const [{ metric: instance, job }, { value: [ unixTime, numOfTopics ] }] = result;
                // console.log(instance, job, unixTime, numOfTopics)
                // const topicCountFormatted = {
                //   instance,
                //   job,
                //   time: unixTime * 1000,
                //   data: {
                //     numOfTopics// this is still a string, but there's no real need to change it into a number
                //   }
                // }
                // // console.log('fgfdgfdg', instance, job, unixTime)
                // console.log('topicCountFormatted: ', topicCountFormatted)
=======
>>>>>>> dev
                res.locals.totalTopicCount = result; //also contains producer requests for EACH topic
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    },
    totalTopicMetrics(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { port } = res.locals;
                const topicMetrics = [
                    axios_1.default.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesin_total`),
                    axios_1.default.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesout_total`),
                    axios_1.default.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesrejected_total`), //example: https://i.imgur.com/RH40ocK.png
                    // axios.get(`http://localhost:${port}/api/v1/query?query=`), // put another relevant query here
                ];
                const axiosGetAll = yield Promise.all(topicMetrics);
                const destructureResults = axiosGetAll.map(promResult => promResult.data.data.result);
<<<<<<< HEAD
                const [[{ metric: { instance, job }, value: [unixTime] }], , [{ value: [, bytesRejected] }]] = destructureResults;
                const bytesMetricsFormatted = {
                    instance,
                    job,
                    time: unixTime * 1000,
                    data: {
                        totalBytesIn: 0,
                        totalBytesOut: 0,
                        bytesIn: [],
                        bytesOut: [],
                        bytesRejected: Number(bytesRejected),
                    }
                };
                destructureResults[0].forEach(el => {
                    if ('topic' in el.metric) {
                        bytesMetricsFormatted.data.bytesIn.push([el.metric.topic, Number(el.value[1])]);
                    }
                    else {
                        bytesMetricsFormatted.data.totalBytesIn = Number(el.value[1]);
                    }
                });
                destructureResults[1].forEach(el => {
                    if ('topic' in el.metric) {
                        bytesMetricsFormatted.data.bytesOut.push([el.metric.topic, Number(el.value[1])]);
                    }
                    else {
                        bytesMetricsFormatted.data.totalBytesOut = Number(el.value[1]);
                    }
                });
                res.locals.totalTopicMetrics = bytesMetricsFormatted;
=======
                res.locals.totalTopicMetrics = destructureResults; // this should be an array of arrays
>>>>>>> dev
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    }
};
<<<<<<< HEAD
=======
// topicsController.totalTopicCount = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_controller_kafkacontroller_globaltopiccount`);
//     res.locals.totalTopicCount = result; //also contains producer requests for EACH topic
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// }
// topicsController.totalTopicMetrics = async (req, res, next) => {
//   try {
//     const { port } = res.locals;
//     const topicMetrics = [
//       axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesin_total`), //total bytes in for cluster AND each topic //example: https://i.imgur.com/mHTXzoP.png
//       axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesout_total`), //total bytes out for cluster AND each topix //example: https://i.imgur.com/zIuiXU2.png
//       axios.get(`http://localhost:${port}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesrejected_total`), //example: https://i.imgur.com/RH40ocK.png
//       // axios.get(`http://localhost:${port}/api/v1/query?query=`), // put another relevant query here
//     ];
//     const axiosGetAll = await Promise.all(topicMetrics);
//     const destructureResults = axiosGetAll.map(promResult => promResult.data.data.result);
//     res.locals.totalTopicMetrics = destructureResults; // this should be an array of arrays
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// }
>>>>>>> dev
exports.default = topicsController;

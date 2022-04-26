"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_query_1 = require("react-query");
const PartitionData_1 = __importDefault(require("../chart_components/PartitionData"));
const InOutData_1 = __importDefault(require("../chart_components/InOutData"));
const ProducerData_1 = __importDefault(require("../chart_components/ProducerData"));
const TopicData_1 = __importDefault(require("../chart_components/TopicData"));
const axiosClient = axios_1.default.create({
    baseURL: 'http://localhost:8080/api/',
});
const GeneralMetric = () => {
    const endpoints = [
        '/partition/total-count',
        '/partition/offline-count',
        '/producer/total-request-count',
        '/producer/total-failed-count',
        '/topic/total-count',
        '/topic/metrics',
    ];
    const queries = endpoints.map(endpoint => ({
        queryKey: endpoint,
        queryFn: () => axiosClient.get(endpoint).then(res => res.data),
        refetchInterval: 2000,
        refetchIntervalInBackground: true,
    }));
    const [partitionTotalCount, partitionOfflineCount, producerTotalReqCount, producerTotalFailCount, topicTotalCount, topicMetrics,] = react_query_1.useQueries(queries);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(PartitionData_1.default, { partitionTotalCount: partitionTotalCount, partitionOfflineCount: partitionOfflineCount }),
        react_1.default.createElement(ProducerData_1.default, { producerTotalReqCount: producerTotalReqCount, producerTotalFailCount: producerTotalFailCount }),
        react_1.default.createElement(TopicData_1.default, { topicTotalCount: topicTotalCount }),
        react_1.default.createElement(InOutData_1.default, { topicMetrics: topicMetrics })));
};
exports.default = GeneralMetric;

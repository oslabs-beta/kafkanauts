"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const client = axios_1.default.create({
    baseURL: 'http://localhost:8080/api/',
});
const SpecificMetric = ({ metricName }) => {
    const [metrics, setMetrics] = (0, react_1.useState)({
        kafka_server_brokertopicmetrics_bytesin_total: -Infinity,
        kafka_server_brokertopicmetrics_bytesout_total: -Infinity,
        kafka_server_brokertopicmetrics_bytesrejected_total: -Infinity,
        kafka_controller_kafkacontroller_globalpartitioncount: -Infinity,
        kafka_controller_kafkacontroller_globaltopiccount: -Infinity,
        kafka_controller_kafkacontroller_offlinepartitionscount: -Infinity,
        kafka_server_brokertopicmetrics_failedproducerequests_total: -Infinity,
        kafka_server_brokertopicmetrics_totalproducerequests_total: -Infinity,
    });
    (0, react_1.useEffect)(() => {
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const metricsRequests = [
                        client.get('/partition/total-count'),
                        client.get('/partition/offline-count'),
                        // client.get('/partition/under-replicated'),
                        client.get('/producer/total-request-count'),
                        client.get('/producer/total-failed-count'),
                        client.get('/topic/total-count'),
                    ];
                    const metricsResponses = yield Promise.all(metricsRequests);
                    const metricsResponsesParse = metricsResponses.reduce((acc, curr) => {
                        const { data } = curr;
                        acc[data[0].metric.__name__] = data[0].value[1];
                        return acc;
                    }, {});
                    const { data } = yield client.get('/topic/metrics');
                    const byteMetrics = data.reduce((acc, curr) => {
                        const index = curr[0];
                        acc[index.metric.__name__] = index.value[1];
                        return acc;
                    }, {});
                    setMetrics(Object.assign(Object.assign({}, byteMetrics), metricsResponsesParse));
                }
                catch (e) {
                    return react_1.default.createElement("p", null, "Error in retrieving metrics");
                }
            });
        })();
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, ((metricName) => {
        switch (metricName) {
            case 'Partition':
                return (react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        "Total Partition Count:",
                        ' ',
                        metrics.kafka_controller_kafkacontroller_globalpartitioncount),
                    react_1.default.createElement("li", null,
                        "Offline Partition Count:",
                        ' ',
                        metrics.kafka_controller_kafkacontroller_offlinepartitionscount)));
            case 'Producer':
                return (react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        "Total Producer Requests:",
                        ' ',
                        metrics.kafka_server_brokertopicmetrics_totalproducerequests_total),
                    react_1.default.createElement("li", null,
                        "Total Failed Producer Requests:",
                        ' ',
                        metrics.kafka_server_brokertopicmetrics_totalproducerequests_total)));
            case 'Topic':
                return (react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        "Total Topic Count: ",
                        metrics.kafka_controller_kafkacontroller_globaltopiccount)));
            case 'Consumer':
                return react_1.default.createElement("p", null, "Coming Soon!!!");
            case 'In/Out':
                return (react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        "Total Bytes In: ",
                        metrics.kafka_server_brokertopicmetrics_bytesin_total,
                        " KBs"),
                    react_1.default.createElement("li", null,
                        "Total Bytes Out: ",
                        metrics.kafka_server_brokertopicmetrics_bytesout_total,
                        " KBs"),
                    react_1.default.createElement("li", null,
                        "Total Bytes Rejected:",
                        ' ',
                        metrics.kafka_server_brokertopicmetrics_bytesrejected_total,
                        " KBs")));
            default:
                return react_1.default.createElement("h6", null, "Loading...");
        }
    })(metricName)));
};
exports.default = SpecificMetric;
//# sourceMappingURL=SpecificMetric.js.map
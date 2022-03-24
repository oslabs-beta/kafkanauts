"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SpecificMetric_1 = __importDefault(require("./SpecificMetric"));
const metricNames = ['Partition', 'Producer', 'Topic', 'Consumer', 'In/Out'];
const GeneralMetric = () => {
    return (react_1.default.createElement("div", null, metricNames.map((name) => (react_1.default.createElement(react_1.default.Fragment, { key: name },
        react_1.default.createElement("h4", null,
            name,
            " metrics: "),
        react_1.default.createElement(SpecificMetric_1.default, { metricName: name }))))));
};
exports.default = GeneralMetric;
//# sourceMappingURL=GeneralMetric.js.map
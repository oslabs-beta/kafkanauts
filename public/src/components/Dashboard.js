"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GeneralMetric_1 = __importDefault(require("./GeneralMetric"));
const Dashboard = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null, "Kafka Monitor Dashboard"),
        react_1.default.createElement(GeneralMetric_1.default, null)));
};
exports.default = Dashboard;

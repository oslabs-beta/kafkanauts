"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GeneralMetric_1 = __importDefault(require("./GeneralMetric"));
const Sidebar_1 = __importDefault(require("./Sidebar"));
const react_bootstrap_1 = require("@themesberg/react-bootstrap");
const Dashboard = () => {
    return (react_1.default.createElement(react_bootstrap_1.Container, null,
        react_1.default.createElement(react_bootstrap_1.Row, { className: 'row flex-nowrap' },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 4 },
                react_1.default.createElement(Sidebar_1.default, null)),
            react_1.default.createElement(react_bootstrap_1.Col, null,
                react_1.default.createElement(GeneralMetric_1.default, null)))));
};
exports.default = Dashboard;

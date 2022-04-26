"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const App_1 = __importDefault(require("./components/App"));
// core styles
require("./volt_scss/volt.scss");
// vendor styles
// import "react-datetime/css/react-datetime.css";
(0, react_dom_1.render)(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(App_1.default, null)), document.getElementById('root'));

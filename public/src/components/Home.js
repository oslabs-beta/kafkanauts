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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const Home = () => {
    const [input, setInput] = (0, react_1.useState)({
        port: null,
        nickname: null,
        time: null,
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleOnChange = (e) => {
        setInput(Object.assign(Object.assign({}, input), { [e.currentTarget.name]: e.currentTarget.value }));
        //console.log(state);
    };
    const handleSubmit = (e) => {
        //console.log('You clicked handleSubmit!')
        e.preventDefault();
        axios_1.default
            .post('http://localhost:8080/api/prom-port', {
            port: input.port,
            nickname: input.nickname,
            time: new Date().toISOString(),
        })
            .then((res) => {
            console.log(res);
            navigate('/dashboard');
        })
            .catch((err) => {
            console.log(err);
        });
    };
    return (react_1.default.createElement("div", { className: "home-page" },
        react_1.default.createElement("h1", null, "Kafka Monitor: Your Metrics in a Nutshell"),
        react_1.default.createElement("h2", null, "Enter your Prometheus port and a name for your new metrics shell to get started!"),
        react_1.default.createElement("form", { id: "userInput-form" },
            react_1.default.createElement("label", null,
                "Prometheus Port:",
                react_1.default.createElement("input", { className: "form-control user-input", type: "text", name: "port", onChange: handleOnChange, required: true })),
            react_1.default.createElement("label", null,
                react_1.default.createElement("br", null),
                "Nickname:",
                react_1.default.createElement("input", { className: "form-control user-input", type: "text", name: "nickname", onChange: handleOnChange, required: true })),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("button", { className: "btn btn-primary", type: "submit", onClick: handleSubmit }, "Submit"))));
};
exports.default = Home;

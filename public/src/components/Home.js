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
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
// Be sure to convert react-bootstrap imports to more specified location to decrease imported object size
const react_bootstrap_1 = require("@themesberg/react-bootstrap");
const Home = () => {
    const [input, setInput] = (0, react_1.useState)({
        port: null,
        nickname: null,
        time: null,
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleOnChange = (e) => {
        setInput(Object.assign(Object.assign({}, input), { [e.currentTarget.name]: e.currentTarget.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios_1.default
            .post('http://localhost:8080/api/prom-port', {
            port: input.port,
            nickname: input.nickname,
            time: new Date().toISOString(),
        })
            .then((res) => { navigate('/dashboard'); })
            .catch((err) => { console.log(err); });
    };
    return (react_1.default.createElement("div", { className: "d-flex align-items-center my-5 mt-lg-6 mb-lg-5" },
        react_1.default.createElement(react_bootstrap_1.Container, null,
            react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-center" },
                react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, className: "d-flex align-items-center justify-content-center" },
                    react_1.default.createElement("div", { className: "bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500" },
                        react_1.default.createElement("div", { className: "text-center text-md-center mb-4 mt-md-0" },
                            react_1.default.createElement("h3", { className: "mb-0" }, "Kafka Monitor"),
                            react_1.default.createElement("h5", null, "Your Metrics in a Nutshell")),
                        react_1.default.createElement(react_bootstrap_1.Form, { className: "mt-4" },
                            react_1.default.createElement(react_bootstrap_1.Form.Group, { id: "port-name", className: "mb-4" },
                                react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Enter Prometheus Port"),
                                react_1.default.createElement(react_bootstrap_1.InputGroup, null,
                                    react_1.default.createElement(react_bootstrap_1.InputGroup.Text, null,
                                        react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faFileExport })),
                                    react_1.default.createElement(react_bootstrap_1.Form.Control, { autoFocus: true, required: true, type: "text", name: "port", placeholder: "9090", onChange: handleOnChange }))),
                            react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                                react_1.default.createElement(react_bootstrap_1.Form.Group, { id: "nickname", className: "mb-4" },
                                    react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Cluster Nickname"),
                                    react_1.default.createElement(react_bootstrap_1.InputGroup, null,
                                        react_1.default.createElement(react_bootstrap_1.InputGroup.Text, null,
                                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUserAstronaut })),
                                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "nickname", placeholder: "Aekorn", onChange: handleOnChange })))),
                            react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", className: "w-100 mt-2", onClick: handleSubmit }, "Submit"))))))));
};
exports.default = Home;

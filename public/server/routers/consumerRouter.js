"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consumerController_1 = __importDefault(require("../controllers/consumerController"));
const router = (0, express_1.Router)();
router.get('/consumer', consumerController_1.default.getConsumerTotalTime, (req, res) => {
    return res.status(200).json(res.locals.consumerTotalTime);
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producerController_1 = __importDefault(require("../controllers/producerController"));
const promPortController_1 = __importDefault(require("../controllers/promPortController"));
const router = (0, express_1.Router)();
router.get('/total-failed-count', promPortController_1.default.getSavedPortFromElectronStore, producerController_1.default.totalFailedProducerRequests, (req, res) => {
    return res.status(200).json(res.locals.totalFailedProducerRequests);
});
router.get('/producerMetrics', promPortController_1.default.getSavedPortFromElectronStore, producerController_1.default.totalProducerMetrics, (req, res) => {
    return res.status(200).json(res.locals.totalProducerMetrics);
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const topicsController_1 = __importDefault(require("../controllers/topicsController"));
const promPortController_1 = __importDefault(require("../controllers/promPortController"));
const router = (0, express_1.Router)();
router.get('/total-count', promPortController_1.default.getSavedPortFromElectronStore, topicsController_1.default.totalTopicCount, (req, res) => {
    return res.status(200).json(res.locals.totalTopicCount);
});
router.get('/metrics', promPortController_1.default.getSavedPortFromElectronStore, topicsController_1.default.totalTopicMetrics, (req, res) => {
    return res.status(200).json(res.locals.totalTopicMetrics);
});
exports.default = router;
//# sourceMappingURL=topicsRouter.js.map
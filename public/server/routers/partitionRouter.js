"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partitionController_1 = __importDefault(require("../controllers/partitionController"));
const promPortController_1 = __importDefault(require("../controllers/promPortController"));
const router = (0, express_1.Router)();
router.get('/total-count', promPortController_1.default.getSavedPortFromElectronStore, partitionController_1.default.totalPartitionCount, (req, res) => {
    return res.status(200).json(res.locals.totalPartitionCount);
});
router.get('/offline-count', promPortController_1.default.getSavedPortFromElectronStore, partitionController_1.default.offlinePartitionCount, (req, res) => {
    return res.status(200).json(res.locals.offlinePartitionCount);
});
router.get('/under-replicated', promPortController_1.default.getSavedPortFromElectronStore, partitionController_1.default.underReplicated, (req, res) => {
    return res.status(200).json(res.locals.underReplicated);
});
exports.default = router;

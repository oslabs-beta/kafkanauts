"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promPortController_1 = __importDefault(require("../controllers/promPortController"));
const consumerController_1 = __importDefault(require("../controllers/consumerController"));
const router = express_1.Router();
router.get('/consumer-lag', promPortController_1.default.getSavedPortFromElectronStore, promPortController_1.default.getSavedStartTimeFromElectronStore, promPortController_1.default.getSavedIntervalFromElectronStore, consumerController_1.default.consumerLag, (req, res) => {
    return res.status(200).json(res.locals.consumerLag);
});
// router.get('/consumer-total-time', promPortController.getSavedPortFromElectronStore, promPortController.getSavedStartTimeFromElectronStore, promPortController.getSavedIntervalFromElectronStore, consumerController.consumerTotalTime, (req: Request, res: Response) => {
//   return res.status(200).json(res.locals.consumerTotalTime);
// });
exports.default = router;

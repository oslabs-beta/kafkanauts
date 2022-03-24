import express from 'express';
import topicsController from '../controllers/topicsController';
import promPortController from '../controllers/promPortController';
const router = express.Router();

router.get('/total-count', promPortController.getSavedPortFromElectronStore, topicsController.totalTopicCount, (req: any, res: any) => {
  return res.status(200).json(res.locals.totalTopicCount);
});

router.get('/metrics', promPortController.getSavedPortFromElectronStore, topicsController.totalTopicMetrics, (req: any, res: any) => {
  return res.status(200).json(res.locals.totalTopicMetrics);
});

export default router;
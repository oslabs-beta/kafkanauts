import { Router, Request, Response } from 'express';
import topicsController from '../controllers/topicsController';
import promPortController from '../controllers/promPortController';

const router: Router = Router();

router.get('/total-count', promPortController.getSavedPortFromElectronStore, topicsController.totalTopicCount, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.totalTopicCount);
});

router.get('/metrics', promPortController.getSavedPortFromElectronStore, topicsController.totalTopicMetrics, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.totalTopicMetrics);
});

export default router;
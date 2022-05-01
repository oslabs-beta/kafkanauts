import { Router, Request, Response } from 'express';
import promPortController from '../controllers/promPortController';
import overviewController from '../controllers/overviewController'; 

const router: Router = Router();

router.get('/overview-metrics', promPortController.getSavedPortFromElectronStore, overviewController.overviewMetrics, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.overviewMetrics);
  });

// router.get('/consumer-total-time', promPortController.getSavedPortFromElectronStore, promPortController.getSavedStartTimeFromElectronStore, promPortController.getSavedIntervalFromElectronStore, consumerController.consumerTotalTime, (req: Request, res: Response) => {
//   return res.status(200).json(res.locals.consumerTotalTime);
// });

export default router;
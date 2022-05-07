import { Router, Request, Response } from 'express';
import promPortController from '../controllers/promPortController';
import overviewController from '../controllers/overviewController'; 

const router: Router = Router();

router.get('/overview-metrics', promPortController.getSavedPortFromElectronStore, overviewController.overviewMetrics, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.overviewMetrics);
  });

export default router;
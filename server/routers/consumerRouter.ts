import { Router, Request, Response } from 'express';
import promPortController from '../controllers/promPortController';
import consumerController from '../controllers/consumerController'; 

const router: Router = Router();

router.get('/consumer-lag', promPortController.getSavedPortFromElectronStore, promPortController.getSavedStartTimeFromElectronStore, promPortController.getSavedIntervalFromElectronStore, consumerController.consumerLag, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.consumerLag);
});

export default router;
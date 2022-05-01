import { Router, Request, Response } from 'express';
import partitionController from '../controllers/partitionController';
import promPortController from '../controllers/promPortController';

const router: Router = Router();

router.get('/total-count', promPortController.getSavedPortFromElectronStore, partitionController.totalPartitionCount, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.totalPartitionCount);
});

router.get('/offline-count', promPortController.getSavedPortFromElectronStore, partitionController.offlinePartitionCount, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.offlinePartitionCount);
});

router.get('/under-replicated', promPortController.getSavedPortFromElectronStore, partitionController.underreplicated, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.underreplicated);
});

router.get('/active-controller', promPortController.getSavedPortFromElectronStore, partitionController.activeControllerCount, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.activeControllerCount);
});

router.get('/request-latency', promPortController.getSavedPortFromElectronStore, partitionController.requestLatency, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.requestLatency);
});

export default router;

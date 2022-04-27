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

router.get('/under-replicated', promPortController.getSavedPortFromElectronStore, partitionController.underReplicated, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.underReplicated);
});

export default router;

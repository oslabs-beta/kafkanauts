import { Router, Request, Response } from 'express';
import producerController from '../controllers/producerController';
import promPortController from '../controllers/promPortController';

const router: Router = Router();

router.get('/total-failed-count', promPortController.getSavedPortFromElectronStore, producerController.totalFailedProducerRequests, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.totalFailedProducerRequests);
});

router.get('/producerMetrics', promPortController.getSavedPortFromElectronStore, producerController.totalProducerMetrics, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.totalProducerMetrics);
});

export default router;

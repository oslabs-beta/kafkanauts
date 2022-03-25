import { Router, Request, Response } from 'express';
import producerController from '../controllers/producerController';
import promPortController from '../controllers/promPortController';

const router: Router = Router();

router.get('/total-request-count', promPortController.getSavedPortFromElectronStore, producerController.totalProducerRequests, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.totalProducerRequests);//also contains producer requests for EACH topic
});

router.get('/total-failed-count', promPortController.getSavedPortFromElectronStore, producerController.totalFailedProducerRequests, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.totalFailedProducerRequests);
});

export default router;

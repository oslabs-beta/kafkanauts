import express from 'express';
import producerController from '../controllers/producerController.js';
import { getSavedPortFromElectronStore } from '../controllers/promPortController';
const router = express.Router();


router.get('/total-request-count', getSavedPortFromElectronStore, producerController.totalProducerRequests, (req: any, res: any) => {
  return res.status(200).json(res.locals.totalProducerRequests);//also contains producer requests for EACH topic
});

router.get('/total-failed-count', getSavedPortFromElectronStore, producerController.totalFailedProducerRequests, (req: any, res: any) => {
  return res.status(200).json(res.locals.totalFailedProducerRequests);
});

export default router;

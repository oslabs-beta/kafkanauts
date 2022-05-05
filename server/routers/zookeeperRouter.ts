import { Router, Request, Response } from 'express';
import zookeeperController from '../controllers/zookeeperController';
import promPortController from '../controllers/promPortController';

const router: Router = Router();

router.get('/avg-latency', promPortController.getSavedPortFromElectronStore, zookeeperController.avg_latency, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.avg_latency);
});
router.get('/health', promPortController.getSavedPortFromElectronStore, zookeeperController.restOfZookeeperMetrics, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.zooMetrics);
});

export default router;
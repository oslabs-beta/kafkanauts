import { Router, Request, Response } from 'express';
import consumerController from '../controllers/consumerController'; 

const router: Router = Router();

router.get('/consumer', consumerController.getConsumerTotalTime, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.consumerTotalTime);
});

export default router;